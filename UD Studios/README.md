# Image Search App - MERN Stack with OAuth

A full-stack image search application built with MongoDB, Express.js, React.js, and Node.js featuring OAuth authentication (Google, Facebook, GitHub) and Unsplash API integration.

## 🎯 Features

- **OAuth Authentication** - Login via Google, Facebook, or GitHub
- **Image Search** - Search images using Unsplash API
- **Multi-Select Grid** - Select multiple images with checkboxes in a 4-column responsive grid
- **Top Searches Banner** - View the top 5 most searched terms across all users
- **Search History** - Personal search history with timestamps for each user
- **Real-time Updates** - Auto-refresh top searches and history
- **Responsive Design** - Mobile-friendly UI with modern styling

## 📁 Project Structure

```
.
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Header.css
│   │   │   ├── Login.js
│   │   │   ├── Login.css
│   │   │   ├── TopSearchesBanner.js
│   │   │   ├── TopSearchesBanner.css
│   │   │   ├── SearchBar.js
│   │   │   ├── SearchBar.css
│   │   │   ├── ImageGrid.js
│   │   │   ├── ImageGrid.css
│   │   │   ├── SearchHistory.js
│   │   │   └── SearchHistory.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── .env.example
│   └── package.json
│
├── server/                 # Express backend
│   ├── config/
│   │   └── passport.js     # Passport OAuth strategies
│   ├── models/
│   │   ├── User.js         # User schema
│   │   └── Search.js       # Search history schema
│   ├── routes/
│   │   ├── auth.js         # Authentication routes
│   │   └── api.js          # API routes
│   ├── services/
│   │   └── unsplash.js     # Unsplash API integration
│   ├── middleware/
│   │   └── auth.js         # Authentication middleware
│   ├── server.js           # Express server entry point
│   ├── .env.example
│   └── package.json
│
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Unsplash API key
- OAuth credentials (Google, Facebook, GitHub)

### 1. Clone the Repository

```bash
cd "full stack assignment"
```

### 2. Backend Setup

#### Install Dependencies

```bash
cd server
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/image-search

# Session Secret (generate a random string)
SESSION_SECRET=your-random-secret-key-min-32-chars

# Unsplash API (https://unsplash.com/developers)
UNSPLASH_ACCESS_KEY=your-unsplash-access-key

# Google OAuth (https://console.cloud.google.com/)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Facebook OAuth (https://developers.facebook.com/)
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret

# GitHub OAuth (https://github.com/settings/developers)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Server Config
PORT=5000
CLIENT_URL=http://localhost:3000
```

#### OAuth Setup Guide

**Google OAuth:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:5000/auth/google/callback`

**Facebook OAuth:**
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Add redirect URI: `http://localhost:5000/auth/facebook/callback`

**GitHub OAuth:**
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create new OAuth App
3. Add callback URL: `http://localhost:5000/auth/github/callback`

**Unsplash API:**
1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Create a new application
3. Copy the Access Key

#### Start MongoDB

```bash
# If using local MongoDB
mongod
```

#### Run the Server

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

### 3. Frontend Setup

#### Install Dependencies

```bash
cd ../client
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `client` directory:

```bash
cp .env.example .env
```

Content:

```env
REACT_APP_API_URL=http://localhost:5000
```

#### Run the Client

```bash
npm start
```

Client will run on `http://localhost:3000`

## 📡 API Endpoints

### Authentication Routes

#### Google OAuth
```
GET /auth/google
GET /auth/google/callback
```

#### Facebook OAuth
```
GET /auth/facebook
GET /auth/facebook/callback
```

#### GitHub OAuth
```
GET /auth/github
GET /auth/github/callback
```

#### Get Current User
```
GET /auth/user
```

**Response:**
```json
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "avatar": "https://avatar-url.com/photo.jpg",
  "provider": "google"
}
```

#### Logout
```
GET /auth/logout
```

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

### API Routes

#### Get Top 5 Searches
```
GET /api/top-searches
```

**Response:**
```json
[
  {
    "term": "nature",
    "count": 45
  },
  {
    "term": "mountains",
    "count": 32
  }
]
```

#### Search Images
```
POST /api/search
```

**Headers:**
- Requires authentication (session cookie)

**Request Body:**
```json
{
  "term": "nature"
}
```

**Response:**
```json
{
  "term": "nature",
  "count": 1000,
  "results": [
    {
      "id": "photo_id",
      "url": "https://images.unsplash.com/photo-url",
      "thumb": "https://images.unsplash.com/photo-thumb",
      "description": "Beautiful nature landscape",
      "user": {
        "name": "Photographer Name",
        "username": "photographer"
      },
      "likes": 150
    }
  ]
}
```

#### Get User's Search History
```
GET /api/history
```

**Headers:**
- Requires authentication (session cookie)

**Response:**
```json
[
  {
    "term": "nature",
    "timestamp": "2025-10-29T10:30:00.000Z"
  },
  {
    "term": "mountains",
    "timestamp": "2025-10-29T09:15:00.000Z"
  }
]
```

## 🧪 API Testing with cURL

### Test Top Searches
```bash
curl http://localhost:5000/api/top-searches
```

### Test Search (requires authentication)
```bash
curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -b "connect.sid=YOUR_SESSION_COOKIE" \
  -d '{"term":"nature"}'
```

### Test User History (requires authentication)
```bash
curl http://localhost:5000/api/history \
  -b "connect.sid=YOUR_SESSION_COOKIE"
```

### Get Current User
```bash
curl http://localhost:5000/auth/user \
  -b "connect.sid=YOUR_SESSION_COOKIE"
```

### Logout
```bash
curl http://localhost:5000/auth/logout \
  -b "connect.sid=YOUR_SESSION_COOKIE"
```

## 📦 Postman Collection

Import this JSON into Postman:

```json
{
  "info": {
    "name": "Image Search API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get Top Searches",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/top-searches"
      }
    },
    {
      "name": "Search Images",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"term\":\"nature\"}"
        },
        "url": "http://localhost:5000/api/search"
      }
    },
    {
      "name": "Get User History",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/history"
      }
    },
    {
      "name": "Get Current User",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/auth/user"
      }
    },
    {
      "name": "Logout",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/auth/logout"
      }
    }
  ]
}
```

## 🎨 Features Breakdown

### 1. Authentication System
- Multi-provider OAuth (Google, Facebook, GitHub)
- Session-based authentication using express-session
- MongoDB session store for persistence
- Protected routes and middleware

### 2. Top Searches Banner
- Displays top 5 search terms across all users
- Real-time updates every 30 seconds
- Shows search count for each term
- Beautiful gradient design

### 3. Image Search
- Integration with Unsplash API
- Saves search history to MongoDB
- Displays results in responsive 4-column grid
- Shows image details (photographer, likes)

### 4. Multi-Select Feature
- Checkbox overlay on each image
- Visual feedback with colored overlay when selected
- Counter showing number of selected images
- Client-side state management

### 5. Search History
- Personal search history for each user
- Timestamps with human-readable format (e.g., "2h ago")
- Collapsible sidebar
- Real-time updates every 10 seconds

## 🛠️ Technologies Used

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Passport.js** - OAuth authentication
- **express-session** - Session management
- **axios** - HTTP client for Unsplash API
- **cors** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **axios** - HTTP client
- **CSS3** - Styling with modern features
- **React Hooks** - State and effect management

## 🔒 Security Features

- Session-based authentication
- HTTP-only cookies
- CORS configuration
- Environment variable protection
- MongoDB session store

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints at 480px, 768px, 1024px, 1200px
- Adaptive grid layout (4 → 3 → 2 → 1 columns)
- Touch-friendly UI elements

## 🚀 Deployment Tips

### Backend Deployment (e.g., Heroku, Railway)
1. Set environment variables in platform settings
2. Ensure MongoDB connection string is set
3. Update OAuth callback URLs to production domain
4. Set `NODE_ENV=production`

### Frontend Deployment (e.g., Vercel, Netlify)
1. Build the app: `npm run build`
2. Set `REACT_APP_API_URL` to production backend URL
3. Configure CORS on backend to allow production frontend

## 📝 Development Notes

- The app uses `axios.defaults.withCredentials = true` for cookie-based auth
- MongoDB indexes are created for optimal query performance
- Search history is limited to 50 most recent searches per user
- Top searches are calculated using MongoDB aggregation pipeline

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- For MongoDB Atlas, whitelist your IP address

### OAuth Callback Error
- Verify callback URLs match in OAuth provider settings
- Check client ID and secret in `.env`
- Ensure `CLIENT_URL` is correctly set

### CORS Issues
- Verify `CLIENT_URL` in server `.env`
- Check `REACT_APP_API_URL` in client `.env`
- Ensure credentials are included in requests

## 📄 License

This project is created for internship assignment purposes.

## 👨‍💻 Author

Developed as part of UD Studios internship assignment.

## 🙏 Acknowledgments

- [Unsplash](https://unsplash.com/) for the image API
- [Passport.js](http://www.passportjs.org/) for OAuth strategies
- All OAuth providers for authentication services
