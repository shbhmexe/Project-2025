import { NextResponse } from 'next/server';
import { sendEmail, emailTemplates } from '@/app/lib/email';

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();
    
    // User creation logic would go here
    const user = { name, email }; // This is a placeholder, actual implementation would create a user in the database
    
    // After successful user creation
    if (user) {
      // Send welcome email
      await sendEmail({
        to: email,
        subject: 'Welcome to Hiring Platform',
        html: emailTemplates.welcome(name),
      });
      
      return NextResponse.json({ success: true, message: 'User registered successfully' });
    }
    
    return NextResponse.json({ success: false, message: 'Failed to create user' }, { status: 400 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ success: false, message: 'Registration failed' }, { status: 500 });
  }
} 