# AI Hiring Platform

A modern hiring platform built with Next.js, featuring AI-powered resume parsing, job matching, and application analysis.

## Deployment Guide

### Environment Variables

The following environment variables need to be set in your Vercel project settings:

#### Required Variables

- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_URL`: The canonical URL of your site (e.g., https://your-domain.com)
- `NEXTAUTH_SECRET`: A secret key for NextAuth.js (generate with `openssl rand -base64 32`)
- `EMAIL_FROM`: Email address used as the sender for all emails

#### Optional Variables (for full functionality)

- `RESEND_API_KEY`: API key for Resend email service
- `OPENAI_API_KEY`: API key for OpenAI (used for resume parsing)

#### Feature Flags

- `NEXT_PUBLIC_ENABLE_RESUME_PARSING`: Set to "true" to enable resume parsing
- `NEXT_PUBLIC_ENABLE_JOB_MATCHING`: Set to "true" to enable job matching
- `NEXT_PUBLIC_ENABLE_APPLICATION_ANALYSIS`: Set to "true" to enable application analysis

### Deployment Steps

1. Fork or clone this repository
2. Set up a PostgreSQL database
3. Configure environment variables in Vercel
4. Deploy to Vercel

```bash
vercel
```

### Local Development

1. Clone the repository
2. Install dependencies

```bash
npm install
```

3. Create a `.env.local` file with the required environment variables
4. Run the development server

```bash
npm run dev
```

## Features

- AI-powered resume parsing
- Job matching based on skills and experience
- Application analysis for recruiters
- User authentication with NextAuth.js
- Responsive design with Tailwind CSS

## Tech Stack

- Next.js 15
- TypeScript
- Prisma ORM
- PostgreSQL
- NextAuth.js
- Tailwind CSS
- Resend (Email)
- OpenAI API

## Troubleshooting Deployment

### Missing API Keys

If you deploy without setting the `RESEND_API_KEY` or `OPENAI_API_KEY`, the application will still work but with limited functionality:

- Without `RESEND_API_KEY`: Emails will be logged to the console but not sent
- Without `OPENAI_API_KEY`: Resume parsing will use a basic algorithm instead of AI

### Database Issues

Make sure your `DATABASE_URL` is correctly set and the database is accessible from Vercel's servers. You may need to configure database access rules to allow connections from Vercel's IP ranges.

### Feature Flags

If you want to disable certain features, set the corresponding feature flag to "false" in your environment variables.
