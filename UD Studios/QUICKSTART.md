# 🚀 Quick Start Guide

## Step 1: Install Dependencies

### Backend
```powershell
cd server
npm install
```

### Frontend
```powershell
cd client
npm install
```

## Step 2: Setup Environment Variables

### Backend (.env)
```powershell
cd server
Copy-Item .env.example .env
```

Edit `server\.env` with your credentials:
- MongoDB URI (local or Atlas)
- Unsplash Access Key
- Google/Facebook/GitHub OAuth credentials
- Session secret (any random 32+ character string)

### Frontend (.env)
```powershell
cd client
Copy-Item .env.example .env
```

The default `REACT_APP_API_URL=http://localhost:5000` should work.

## Step 3: Start MongoDB

If using local MongoDB:
```powershell
mongod
```

Or use MongoDB Atlas connection string in `.env`

## Step 4: Run the Application

### Terminal 1 - Backend
```powershell
cd server
npm run dev
```
Server runs on http://localhost:5000

### Terminal 2 - Frontend
```powershell
cd client
npm start
```
Client runs on http://localhost:3000

## Step 5: Test OAuth

1. Visit http://localhost:3000
2. Click on Google/Facebook/GitHub login
3. Complete OAuth flow
4. Start searching images!

## 📝 Getting API Keys

### Unsplash (Required)
1. Visit https://unsplash.com/developers
2. Create account and new application
3. Copy Access Key to `.env`

### Google OAuth (Choose at least one)
1. https://console.cloud.google.com/
2. Create project → APIs & Services → Credentials
3. Create OAuth 2.0 Client ID
4. Add redirect: `http://localhost:5000/auth/google/callback`

### Facebook OAuth
1. https://developers.facebook.com/
2. Create app → Add Facebook Login
3. Add redirect: `http://localhost:5000/auth/facebook/callback`

### GitHub OAuth
1. https://github.com/settings/developers
2. New OAuth App
3. Callback: `http://localhost:5000/auth/github/callback`

## ✅ Verification

1. Backend health check: http://localhost:5000/health
2. Top searches API: http://localhost:5000/api/top-searches
3. Frontend: http://localhost:3000

## 🐛 Common Issues

**MongoDB Connection Failed**
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in `.env`

**OAuth Redirect Error**
- Verify callback URLs match in provider settings
- Check CLIENT_URL in server `.env`

**Port Already in Use**
- Change PORT in server `.env` (default: 5000)
- Frontend port can be changed via React env

## 📚 Next Steps

- Read full documentation in `README.md`
- Test API endpoints using cURL or Postman
- Explore the code structure
- Customize the UI and features

Happy coding! 🎉
