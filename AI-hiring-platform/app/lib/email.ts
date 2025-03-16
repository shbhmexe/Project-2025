import { Resend } from 'resend';

// Initialize Resend with API key or use a mock implementation if key is missing
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey 
  ? new Resend(resendApiKey)
  : {
      emails: {
        send: async (options) => {
          console.log('MOCK EMAIL SENT:', options);
          return { 
            data: { id: 'mock-email-id' }, 
            error: null 
          };
        }
      }
    };

// Basic send email function
export async function sendEmail({ 
  to, 
  subject, 
  html, 
  from = process.env.EMAIL_FROM 
}: { 
  to: string | string[]; 
  subject: string; 
  html: string; 
  from?: string;
}) {
  try {
    // If no API key is set, log the email instead of trying to send it
    if (!resendApiKey) {
      console.log('Email sending skipped - No Resend API key provided');
      console.log('Would have sent email:', { from, to, subject, html: html.substring(0, 100) + '...' });
      return { success: true, data: { id: 'mock-email-id' } };
    }

    const { data, error } = await resend.emails.send({
      from: from || `Hiring Platform <${process.env.EMAIL_FROM || 'noreply@example.com'}>`,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });

    if (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }

    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Exception sending email:', error);
    return { success: false, error };
  }
}

// Email templates
export const emailTemplates = {
  // Application notification for recruiters
  applicationNotification: (jobTitle: string, candidateName: string, applicationId: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h2 style="color: #4f46e5;">New Application Received</h2>
      <p>Hello,</p>
      <p>A new application has been received for the <strong>${jobTitle}</strong> position.</p>
      <p>Candidate: <strong>${candidateName}</strong></p>
      <p>Please log in to your dashboard to review this application.</p>
      <a href="${process.env.NEXTAUTH_URL}/dashboard/recruiter/applications/${applicationId}" 
         style="display: inline-block; background-color: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 15px;">
        View Application
      </a>
      <p style="margin-top: 20px; color: #666;">Thank you,<br>Hiring Platform Team</p>
    </div>
  `,

  // Welcome email for new users
  welcome: (name: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h2 style="color: #4f46e5;">Welcome to Hiring Platform!</h2>
      <p>Hello ${name},</p>
      <p>Thank you for joining Hiring Platform. We're excited to help you in your career journey!</p>
      <p>Get started by:</p>
      <ul>
        <li>Completing your profile</li>
        <li>Uploading your resume</li>
        <li>Exploring available job opportunities</li>
      </ul>
      <a href="${process.env.NEXTAUTH_URL}/profile" 
         style="display: inline-block; background-color: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 15px;">
        Complete Your Profile
      </a>
      <p style="margin-top: 20px; color: #666;">Best regards,<br>Hiring Platform Team</p>
    </div>
  `,

  // Password reset email
  passwordReset: (resetToken: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h2 style="color: #4f46e5;">Password Reset Request</h2>
      <p>Hello,</p>
      <p>We received a request to reset your password. Click the button below to reset it:</p>
      <a href="${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}" 
         style="display: inline-block; background-color: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 15px;">
        Reset Password
      </a>
      <p style="margin-top: 20px;">If you didn't request this, please ignore this email.</p>
      <p style="color: #666;">Thank you,<br>Hiring Platform Team</p>
      <p style="font-size: 12px; color: #999; margin-top: 20px;">This link will expire in 1 hour.</p>
    </div>
  `,

  // Interview invitation
  interviewInvitation: (candidateName: string, jobTitle: string, companyName: string, dateTime: string, location: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h2 style="color: #4f46e5;">Interview Invitation</h2>
      <p>Hello ${candidateName},</p>
      <p>We're pleased to invite you for an interview for the <strong>${jobTitle}</strong> position at <strong>${companyName}</strong>.</p>
      <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>Date & Time:</strong> ${dateTime}</p>
        <p style="margin: 5px 0;"><strong>Location:</strong> ${location}</p>
      </div>
      <p>Please confirm your attendance by clicking the button below:</p>
      <a href="${process.env.NEXTAUTH_URL}/interviews/confirm" 
         style="display: inline-block; background-color: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 15px;">
        Confirm Attendance
      </a>
      <p style="margin-top: 20px; color: #666;">Best regards,<br>Hiring Platform Team</p>
    </div>
  `,

  // Job match notification
  jobMatch: (userName: string, jobTitle: string, companyName: string, matchPercentage: number, jobId: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h2 style="color: #4f46e5;">New Job Match Found!</h2>
      <p>Hello ${userName},</p>
      <p>We found a job that matches your profile!</p>
      <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>Job Title:</strong> ${jobTitle}</p>
        <p style="margin: 5px 0;"><strong>Company:</strong> ${companyName}</p>
        <p style="margin: 5px 0;"><strong>Match Score:</strong> <span style="color: #4f46e5; font-weight: bold;">${matchPercentage}%</span></p>
      </div>
      <p>This job aligns well with your skills and experience. Don't miss this opportunity!</p>
      <a href="${process.env.NEXTAUTH_URL}/jobs/${jobId}" 
         style="display: inline-block; background-color: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 15px;">
        View Job Details
      </a>
      <p style="margin-top: 20px; color: #666;">Best regards,<br>Hiring Platform Team</p>
    </div>
  `,

  // Application status update
  applicationUpdate: (candidateName: string, jobTitle: string, companyName: string, status: string, jobId: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h2 style="color: #4f46e5;">Application Status Update</h2>
      <p>Hello ${candidateName},</p>
      <p>There's an update regarding your application for the <strong>${jobTitle}</strong> position at <strong>${companyName}</strong>.</p>
      <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>New Status:</strong> <span style="color: #4f46e5; font-weight: bold;">${status}</span></p>
      </div>
      <p>You can check your application details by clicking the button below:</p>
      <a href="${process.env.NEXTAUTH_URL}/jobs/${jobId}/application" 
         style="display: inline-block; background-color: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 15px;">
        View Application
      </a>
      <p style="margin-top: 20px; color: #666;">Best regards,<br>Hiring Platform Team</p>
    </div>
  `
}; 