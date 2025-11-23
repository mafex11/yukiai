import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'sudhanshuk1140@gmail.com',
      subject: 'New Waitlist Subscription - Yuki AI',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px;">New Waitlist Subscription</h2>
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              A new user has joined the waitlist for Yuki AI.
            </p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0; color: #333;">
                <strong>Email:</strong> ${email}
              </p>
            </div>
            <p style="color: #666; font-size: 14px; margin-top: 20px;">
              This is an automated notification from the Yuki AI waitlist system.
            </p>
          </div>
        </div>
      `,
      text: `New Waitlist Subscription\n\nEmail: ${email}\n\nA new user has joined the waitlist for Yuki AI.`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

