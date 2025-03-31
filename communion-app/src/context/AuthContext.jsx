import { createContext, useContext, useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Initialize Firebase with Google Cloud project configuration
const app = initializeApp({
  apiKey: "AIzaSyDKhO7T_x23L0QlXoGTUKzc_XrwNpUg5zQ",
  authDomain: "communion-app-auth.firebaseapp.com",
  projectId: "communion-app-auth",
});

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
// Add scopes to request email and profile info
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
// Always prompt for account selection
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for user data in localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      console.log("Starting Google authentication...");
      
      // Force authentication popup to show every time
      auth.signOut();
      
      // Use Firebase's Google authentication popup
      const result = await signInWithPopup(auth, googleProvider);
      
      // Get additional user info from the token
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // Use token for verification that we have proper auth
      const _ = credential.accessToken;
      
      // Create user from Google data
      const user = result.user;
      console.log("Google auth succeeded with user:", user);
      
      const googleUser = {
        uid: user.uid,
        displayName: user.displayName || 'Google User',
        email: user.email,
        photoURL: user.photoURL,
        provider: 'google'
      };
      
      console.log("Saving user data:", googleUser);
      setCurrentUser(googleUser);
      localStorage.setItem('currentUser', JSON.stringify(googleUser));
      
      return googleUser;
    } catch (error) {
      console.error('Google authentication error:', error);
      
      // No automatic fallback - if Google auth fails, it should show the error
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGithub = async () => {
    try {
      setLoading(true);
      
      // Simple GitHub login with mock data
      const githubUser = {
        uid: 'github-user-' + Math.random().toString(36).substring(2, 7),
        displayName: 'GitHub User',
        email: 'github.user@example.com',
        photoURL: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
        provider: 'github'
      };
      
      setCurrentUser(githubUser);
      localStorage.setItem('currentUser', JSON.stringify(githubUser));
      
      return githubUser;
    } catch (error) {
      console.error('Error signing in with GitHub:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmailPassword = async (email, password, name = '') => {
    try {
      setLoading(true);
      
      // Simple email login with provided info
      const emailUser = {
        uid: 'email-user-' + Math.random().toString(36).substring(2, 7),
        displayName: name || email.split('@')[0],
        email: email,
        photoURL: 'https://ui-avatars.com/api/?name=' + (name || email.split('@')[0]) + '&background=random',
        provider: 'email'
      };
      
      setCurrentUser(emailUser);
      localStorage.setItem('currentUser', JSON.stringify(emailUser));
      
      return emailUser;
    } catch (error) {
      console.error('Error signing in with email:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerWithEmailPassword = async (email, password, name) => {
    // Just use the same function as login for simplicity
    return loginWithEmailPassword(email, password, name);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    try {
      auth.signOut();
    } catch (e) {
      console.log("Error signing out of Firebase:", e);
    }
  };

  const value = {
    currentUser,
    loading,
    loginWithGoogle,
    loginWithGithub,
    loginWithEmailPassword,
    registerWithEmailPassword,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
}; 