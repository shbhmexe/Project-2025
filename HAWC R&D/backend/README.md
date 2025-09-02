   # CodeIgniter Backend API

This is the backend API for the CodeIgniter application with authentication features.

## Features

- User authentication (register, login, get current user)
- Token-based authentication using JWT
- Teachers management (CRUD operations)
- MySQL database integration

## Prerequisites

- Node.js (v14 or higher)
- MySQL database

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=codeigniter_db
   JWT_SECRET=your_jwt_secret_key
   ```

3. Set up the database:
   - Create a MySQL database named `codeigniter_db`
   - Import the schema from `database/schema.sql`

4. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Teachers

- `GET /api/teachers` - Get all teachers (requires token)
- `GET /api/teachers/:id` - Get teacher by ID (requires token)
- `POST /api/teachers` - Create a new teacher (requires token)
- `PUT /api/teachers/:id` - Update a teacher (requires token)
- `DELETE /api/teachers/:id` - Delete a teacher (requires token)