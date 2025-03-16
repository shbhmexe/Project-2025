import { sendEmail, emailTemplates } from '@/app/lib/email';

// Inside the POST handler function, after user creation:
// ... existing code ...
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
// ... existing code ... 