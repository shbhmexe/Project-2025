// Mock Auth Configuration
// This file contains configuration for the mock authentication system

// Default user profile images for different auth providers
export const defaultAvatars = {
  google: 'https://lh3.googleusercontent.com/a/default-user',
  github: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
  email: 'https://ui-avatars.com/api/?background=random&color=fff&size=200&font-size=0.5'
};

// Default display names for social providers
export const defaultNames = {
  google: 'Google User',
  github: 'GitHub User'
};

// Mock validation settings
export const validationSettings = {
  minPasswordLength: 6,
  requireEmail: true
};

// Firebase Configuration with fallbacks
// This allows the app to build even without environment variables
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDKhO7T_x23L0QlXoGTUKzc_XrwNpUg5zQ", 
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "communion-app-auth.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "communion-app-auth",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "communion-app-auth.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "684054997926",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:684054997926:web:9af3f89d01f175ba4dde55"
};

// GitHub OAuth Configuration
export const githubConfig = {
  clientId: import.meta.env.VITE_GITHUB_CLIENT_ID || "0v23115zyDK7UdxkLG6B"
};

// Google OAuth Configuration
export const googleConfig = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || "684054997926-d8are4hdm086u5d65mii3hmmk8bl9e27.apps.googleusercontent.com"
}; 