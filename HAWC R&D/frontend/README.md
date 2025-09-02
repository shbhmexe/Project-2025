# CodeIgniter App Frontend

This is the frontend for the CodeIgniter App, a React application that demonstrates token-based authentication and data management for teachers.

## Features

- User authentication (Register, Login, Logout)
- Protected routes with JWT authentication
- Teacher data management (CRUD operations)
- Responsive UI with Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running (see backend README for setup)

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following content:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Build for Production

```
npm run build
```

## Project Structure

- `src/components/auth`: Authentication-related components
- `src/components/layout`: Layout components like Navbar
- `src/components/pages`: Page components
- `src/components/teachers`: Teacher data management components
- `src/context`: React context for state management
- `src/services`: API service functions

## Technologies Used

- React with TypeScript
- React Router for navigation
- Axios for API requests
- Tailwind CSS for styling
- Vite for fast development and building
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
