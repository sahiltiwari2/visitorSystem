import { Resend } from 'resend';
import WelcomeTemplete from "@/emails/index"
import { NextResponse } from 'next/server';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request, res: Response ) { 
    const { firstName } = await request.json();
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: ['sahiltiwari2005@gmail.com'],
        subject: 'Hello world',
        react: WelcomeTemplete({firstName})
      });

      return NextResponse.json({
        status: 'ok'
      })
}