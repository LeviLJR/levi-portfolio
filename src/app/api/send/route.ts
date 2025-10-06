// app/api/send/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY); 
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'leviliberman.dev@gmail.com',
      subject: `New message from ${name}`,
      replyTo: email,
      text: `From: ${name} <${email}>\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error('Error sending:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
