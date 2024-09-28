'use client';

import React, { FormEvent } from "react";
import { Checkbox, Button } from "@nextui-org/react";
import { DatePicker } from "@nextui-org/date-picker";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DateValue, parseDate } from '@internationalized/date';
import { POST } from "./api/email/route";

export default function App() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState("");
  const [date, setDate] = useState<DateValue | null>(null); // Use DateValue from DatePicker

  const updateDateTime = () => {
    setCurrentDateTime(new Date().toLocaleString());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === "" || number === "" || email === "" || purpose === "" || !date) {
      toast.error('Fill all the fields before submitting', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      updateDateTime();

      const data = {
        Time: currentDateTime,
        Name: name,
        Number: number,
        Email: email,
        Purpose: purpose,
        Date: date?.toString() ,
        Approval: "Pending"
      };

      console.log(data)

      axios.post('https://sheet.best/api/sheets/88d088a7-cb5c-4104-99a0-3036178f53d3', data).then((response) => {
        console.log(response);
        setName('');
        setEmail('');
        setNumber('');
        setPurpose('');
        setDate(null);
      });

      await fetch('api/email',{
        method: 'POST',
        body: JSON.stringify({
          firstName: {name}
        })
      })

      toast('Request Submitted successfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <form onSubmit={handleSubmit}>
          <div className="p-2"></div>
          <div className="text-center text-4xl font-bold border text-black py-8 px-12 rounded-lg shadow-lg" style={{ maxWidth: '800px', margin: '0 auto' }}>
            Visitor Approval Form
          </div>

          <div className="flex justify-center">
            <div className="flex flex-col">
              <div className="flex flex-col item-center justify-center p-3 w-[700px] mt-10 ">
                <div className=" font-bold mb-2">Name</div>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  type="text"
                  id="name"
                  name="name"
                  className="bg-gray-200 text-black border-gray-700 rounded-md shadow-sm py-2 px-3 w-full"
                  placeholder="Enter your name"
                />
              </div>
              <div className="flex flex-col item-center justify-center p-3 w-[700px] mt-10 ">
                <div className=" font-bold mb-2">Phone Number</div>
                <input
                  value={number}
                  onChange={e => setNumber(e.target.value)}
                  type="number"
                  id="number"
                  name="number"
                  className="bg-gray-200 text-black border-gray-700 rounded-md shadow-sm py-2 px-3 w-full"
                  placeholder="Enter your Number"
                />
              </div>
              <div className="flex flex-col item-center justify-center p-3 w-[700px] mt-10 ">
                <div className=" font-bold mb-2">E-Mail</div>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="text"
                  id="text"
                  name="text"
                  className="bg-gray-200 text-black border-gray-700 rounded-md shadow-sm py-2 px-3 w-full"
                  placeholder="Enter your Mail ID"
                />
              </div>
              <div className="flex flex-col item-center justify-center p-3 w-[700px] mt-10 ">
                <div className=" font-bold mb-2">Purpose</div>
                <input
                  value={purpose}
                  onChange={e => setPurpose(e.target.value)}
                  type="text"
                  id="text"
                  name="text"
                  className="bg-gray-200 text-black border-gray-700 rounded-md shadow-sm py-2 px-3 w-full"
                  placeholder="Enter your Purpose"
                />
              </div>
              <div className="flex flex-col item-center justify-center p-3 w-[700px] mt-10 ">
                <DatePicker
                  label="Visit Date"
                  value={date}
                  onChange={setDate} // DateValue will be automatically handled
                  className="max-w-[284px]"
                />
              </div>
            </div>
          </div>
          <div>
            <Button type="submit" color="success" className="text-white">
              Submit
            </Button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
