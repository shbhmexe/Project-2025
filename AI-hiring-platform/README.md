# AI-Powered Hiring Platform

A next-generation recruitment platform designed to connect recruiters and job seekers through an intelligent, AI-powered ecosystem.

## Features

- **Intelligent Resume Processing**: Extract structured information from resumes
- **Smart Job-Candidate Matching**: Match job postings with candidate profiles
- **Applicant Tracking System**: Analyze resumes against job descriptions
- **User Authentication & Profiles**: Secure registration and login flows
- **Recruiter Dashboard**: Job posting creation and management
- **Candidate Portal**: Professional profile creation and job search

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **Form Validation**: Zod
- **PDF Parsing**: pdf-parse
- **File Storage**: Cloudinary (optional)
- **AI Services**: OpenAI API (optional)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/hiring-platform.git
cd hiring-platform
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Copy the example .env file
cp .env.example .env.local
# Edit the .env.local file with your own values
```

4. Set up the database
```bash
npx prisma migrate dev
```

5. Start the development server
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

The application uses environment variables for configuration. These are defined in the `.env` file:

### Required Environment Variables

```
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/hiring-platform"

# NextAuth.js Configuration
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# JWT Configuration
JWT_SECRET="your-jwt-secret"
```

### Optional Environment Variables

```
# Email Service (for password reset, notifications)
EMAIL_SERVER=smtp://username:password@smtp.example.com:587
EMAIL_FROM=noreply@example.com

# File Upload Service (for resumes, profile pictures)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
FILE_UPLOAD_FOLDER="hiring-platform"

# AI Services (for resume parsing, job matching)
OPENAI_API_KEY="your-openai-api-key"
AI_MODEL="gpt-3.5-turbo"
AI_SERVICE_TIMEOUT="30000"

# Resume Processing API
RESUME_API_URL="https://api.example.com/resume"
RESUME_API_KEY="your-resume-api-key"
RESUME_API_USE_MOCK="true"
RESUME_API_TIMEOUT="10000"

# Job Matching API
JOB_MATCHING_API_URL="https://api.example.com/job-matching"
JOB_MATCHING_API_KEY="your-job-matching-api-key"
JOB_MATCHING_API_USE_MOCK="true"
JOB_MATCHING_API_TIMEOUT="10000"

# Application Analysis API
APPLICATION_ANALYSIS_API_URL="https://api.example.com/application-analysis"
APPLICATION_ANALYSIS_API_KEY="your-application-analysis-api-key"
APPLICATION_ANALYSIS_API_USE_MOCK="true"
APPLICATION_ANALYSIS_API_TIMEOUT="10000"

# Feature Flags
ENABLE_RESUME_PARSING="true"
ENABLE_JOB_MATCHING="true"
ENABLE_APPLICATION_ANALYSIS="true"
```

## API Services

The application uses several API services for its intelligent features. These services can be configured through environment variables.

### Mock Mode

By default, the application runs in "mock mode" for API services, which means it uses simulated data instead of making actual API calls. This is useful for development and testing.

To use real API services, set the following environment variables:

```
RESUME_API_USE_MOCK="false"
JOB_MATCHING_API_USE_MOCK="false"
APPLICATION_ANALYSIS_API_USE_MOCK="false"
```

And provide the corresponding API keys:

```
RESUME_API_KEY="your-resume-api-key"
JOB_MATCHING_API_KEY="your-job-matching-api-key"
APPLICATION_ANALYSIS_API_KEY="your-application-analysis-api-key"
```

### Feature Flags

You can enable or disable specific features using feature flags:

```
ENABLE_RESUME_PARSING="true"
ENABLE_JOB_MATCHING="true"
ENABLE_APPLICATION_ANALYSIS="true"
```

## Project Structure

```
hiring-platform/
├── app/                  # Next.js App Router
│   ├── api/              # API Routes
│   ├── auth/             # Authentication pages
│   ├── components/       # Reusable components
│   ├── dashboard/        # Dashboard pages
│   ├── jobs/             # Job-related pages
│   ├── lib/              # Utility functions and API services
│   ├── profile/          # Profile pages
│   ├── providers/        # Context providers
│   └── types/            # TypeScript type definitions
├── prisma/               # Prisma schema and migrations
├── public/               # Static assets
└── ...
```

## Core Features Implementation

### Intelligent Resume Processing
- PDF parsing to extract structured information
- Skills, education, and experience extraction
- Clean, organized display of parsed information

### Smart Job-Candidate Matching
- Algorithm to match job postings with candidate profiles
- Identification of relevant skills and experience
- Compatibility score with explanation

### Applicant Tracking System
- Resume analysis against job descriptions
- Missing keyword identification
- Actionable feedback for application improvement

## Email Service

The application uses [Resend](https://resend.com) for sending emails. To set up the email service:

1. Create an account on [Resend](https://resend.com)
2. Generate an API key
3. Add the API key to your `.env` file:
   ```
   RESEND_API_KEY=re_your_api_key_here
   EMAIL_FROM=noreply@yourdomain.com
   ```
4. Verify your domain in the Resend dashboard

The email service is used for:
- Welcome emails for new users
- Password reset emails
- Application notifications
- Job match notifications
- Interview invitations

## License

This project is licensed under the MIT License - see the LICENSE file for details.
