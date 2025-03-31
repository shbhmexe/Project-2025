// Firebase Configuration with fallbacks
// This allows the app to build even without environment variables
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDKhO7T_x23L0QlXoGTUKzc_XrwNpUg5zQ", 
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "communion-app-auth.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "communion-app-auth",
};

// GitHub OAuth Configuration
export const githubConfig = {
  clientId: import.meta.env.VITE_GITHUB_CLIENT_ID || "0v23115zyDK7UdxkLG6B"
};

// Google OAuth Configuration
export const googleConfig = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || "684054997926-d8are4hdm086u5d65mii3hmmk8bl9e27.apps.googleusercontent.com"
}; 