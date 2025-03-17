# Personal Finance Visualizer

A comprehensive web application for tracking personal finances, built with Next.js, TypeScript, and Tailwind CSS.

## Features

### Stage 1: Basic Transaction Tracking
- Add/Edit/Delete transactions (amount, date, description)
- Transaction list view with sorting and filtering
- Monthly expenses bar chart
- Form validation

### Stage 2: Categories
- Predefined categories for transactions
- Category-wise pie chart
- Dashboard with summary cards: total expenses, category breakdown, most recent transactions

### Stage 3: Budgeting
- Set monthly category budgets
- Budget vs actual comparison chart
- Spending insights

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Charts**: Recharts
- **Form Handling**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/finance-tracker.git
   cd finance-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file based on `.env.local.example`:
   ```bash
   cp .env.local.example .env.local
   ```

4. Update the environment variables in `.env.local` with your own values.

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
finance-tracker/
├── app/                  # Next.js app directory
│   ├── api/              # API routes
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # Dashboard page
│   ├── transactions/     # Transactions page
│   ├── categories/       # Categories page
│   ├── budgets/          # Budgets page
│   └── ...
├── components/           # React components
│   ├── layouts/          # Layout components
│   ├── transactions/     # Transaction components
│   ├── categories/       # Category components
│   ├── budgets/          # Budget components
│   ├── charts/           # Chart components
│   └── ...
├── lib/                  # Utility functions
├── models/               # Mongoose models
├── providers/            # React context providers
├── public/               # Static assets
└── ...
```

## Deployment

This application can be deployed on Vercel, Netlify, or any other platform that supports Next.js.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
