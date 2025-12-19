# MDU IITM Learning Platform

![image](https://github.com/user-attachments/assets/f6d20843-d09a-44f3-87fd-7ce01d667d03)


A comprehensive educational platform built for B.Tech students of Maharaja Surajmal Dutt Institute of Information Technology and Management (MDU IITM), Janakpuri. This platform provides study materials, resources, and tools to enhance the learning experience for students.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overviews

The MDU IITM Learning Platform is designed to serve as a centralized hub for all educational resources needed by B.Tech students at MDU IITM Janakpuri. It provides easy access to study materials, lecture notes, previous year question papers, syllabus information, and much more.

## Features

- **Study Materials Repository**: Access to comprehensive study materials organized by semester and subject
- **Course Syllabus**: Detailed syllabus information for all B.Tech courses
- **Previous Year Papers**: Collection of past examination papers for practice
- **Interactive UI**: User-friendly interface for seamless navigation
- **Responsive Design**: Optimized for both desktop and mobile viewing
- **Search Functionality**: Quick search for specific topics or materials
- **Authentication**: Secure login system for students and faculty
- **Resource Downloads**: Easy download of study materials in various formats
- **Announcements**: Important notifications and updates for students
- **Dark/Light Mode**: Theme toggle for better reading experience

## Tech Stack

This project is built using the following technologies:

- **Frontend**:
  - [Next.js 14](https://nextjs.org/) - React framework with server-side rendering
  - [TypeScript](https://www.typescriptlang.org/) - Static type checking
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
  - [React Context API](https://reactjs.org/docs/context.html) - State management

- **Backend**:
  - [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - Serverless API endpoints
  - [MongoDB](https://www.mongodb.com/) - NoSQL database (assumed)

- **Authentication**:
  - [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js

- **Deployment**:
  - [Vercel](https://vercel.com/) - Hosting platform optimized for Next.js

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or later)
- npm or yarn package manager
- MongoDB connection (if using a database)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/mdu-IITM-learn.git
   cd mdu-IITM-learn
    ```
2. Install dependencies:
    ```bash
    npm install
# or
    yarn install
    ```    
3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
    ```bash
    MONGODB_URI=your_mongodb_connection_string
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_nextauth_secret
    ```
   # Add other environment variables as needed


4. Run the development server:   
    ```
    npm run dev
# or
    yarn dev
    ```

5. Open the application:
Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```bash
mdu-IITM-learn/
├── app/                     # Next.js App Router structure
│   ├── api/                 # API routes
│   ├── (auth)/              # Authentication related pages
│   ├── courses/             # Course-related pages
│   ├── materials/           # Study materials pages
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Home page
│
├── components/              # Reusable React components
│   ├── ui/                  # UI components (buttons, cards, etc.)
│   ├── layout/              # Layout components
│   ├── forms/               # Form components
│
├── lib/                     # Utility functions and helpers
├── models/                  # Database models
├── public/                  # Static assets
├── styles/                  # Global styles
├── types/                   # TypeScript type definitions
│
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Project dependencies
```

---

## Usage

### Students

1. Visit the platform at [https://www.mduiitmlearn.app/](https://www.mduiitmlearn.app/)
2. Create an account or log in with your student credentials
3. Navigate through the different sections to access study materials
4. Download resources for offline study
5. Check announcements for important updates

### Administrators

1. Log in with administrator credentials
2. Access the admin dashboard
3. Upload new study materials and resources
4. Manage user accounts and permissions
5. Post announcements and updates

---

## API Endpoints

The application provides several API endpoints:

```bash
GET    /api/materials         # Fetch all study materials
GET    /api/materials/[id]    # Fetch a specific study material
POST   /api/materials         # Add a new study material (admin only)
PUT    /api/materials/[id]    # Update a study material (admin only)
DELETE /api/materials/[id]    # Delete a study material (admin only)
GET    /api/courses           # Fetch all courses
GET    /api/users/me          # Fetch current user information
```

---

## Next.js and TypeScript Implementation

### App Router

This project utilizes Next.js 14's App Router, which provides:

- **Server Components**: Most components are server components for improved performance
- **Route Groups**: Organized routes with logical grouping
- **Layouts**: Shared layouts across multiple pages
- **Loading States**: Built-in loading states for better UX

## Contributing

We welcome contributions to the MDU IITM Learning Platform! Please follow these steps:

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any queries or suggestions, please reach out to:
- **Email**: [mduiitmnotes@gmail.com](mailto:mduiitmnotes@gmail.com)
- **Website**: [https://www.mduiitmlearn.app/](https://www.mduiitmlearn.app/)

## Author
👨‍💻 **Shubham Shukla**
This project was created by **Shubham Shukla**. Feel free to reach out on [LinkedIn](https://www.linkedin.com/in/shubham-shukla-62095032a/).
