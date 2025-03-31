import { createContext, useContext, useState, useEffect } from 'react';
import { 
  GoogleAuthProvider, 
  GithubAuthProvider,
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth 
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig, defaultAvatars } from '../config/authConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configure providers
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
googleProvider.setCustomParameters({ prompt: 'select_account' });

const githubProvider = new GithubAuthProvider();
githubProvider.addScope('user:email');
githubProvider.addScope('read:user');

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for user data in localStorage on initial load
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const formattedUser = formatUserData(user);
        setCurrentUser(formattedUser);
        localStorage.setItem('currentUser', JSON.stringify(formattedUser));
      } else {
        // Try to get from localStorage as backup
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          setCurrentUser(JSON.parse(storedUser));
        } else {
          setCurrentUser(null);
          localStorage.removeItem('currentUser');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Format user data consistently
  const formatUserData = (user) => {
    let provider = 'email';
    if (user.providerData && user.providerData.length > 0) {
      if (user.providerData[0].providerId === 'google.com') {
        provider = 'google';
      } else if (user.providerData[0].providerId === 'github.com') {
        provider = 'github';
      }
    }

    return {
      uid: user.uid,
      displayName: user.displayName || user.email?.split('@')[0] || 'User',
      email: user.email,
      photoURL: user.photoURL || defaultAvatars[provider],
      provider: provider
    };
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      console.log("Starting Google authentication...");
      
      // Force authentication popup to show every time
      await auth.signOut();
      
      // Use Firebase's Google authentication popup
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google auth succeeded with user:", result.user);
      
      // Create formatted user
      const formattedUser = formatUserData(result.user);
      setCurrentUser(formattedUser);
      localStorage.setItem('currentUser', JSON.stringify(formattedUser));
      
      return formattedUser;
    } catch (error) {
      console.error('Google authentication error:', error);
      
      // If error is related to popup being blocked, show helpful message
      if (error.code === 'auth/popup-blocked') {
        throw new Error('Popup was blocked by the browser. Please allow popups for this site.');
      }
      
      // Show general error
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGithub = async () => {
    try {
      setLoading(true);
      console.log("Starting GitHub authentication...");
      
      // Force authentication popup to show every time
      await auth.signOut();
      
      // Use Firebase's GitHub authentication popup
      const result = await signInWithPopup(auth, githubProvider);
      console.log("GitHub auth succeeded with user:", result.user);
      
      // Create formatted user
      const formattedUser = formatUserData(result.user);
      setCurrentUser(formattedUser);
      localStorage.setItem('currentUser', JSON.stringify(formattedUser));
      
      return formattedUser;
    } catch (error) {
      console.error('GitHub authentication error:', error);
      
      // If error is related to popup being blocked, show helpful message
      if (error.code === 'auth/popup-blocked') {
        throw new Error('Popup was blocked by the browser. Please allow popups for this site.');
      }
      
      // Show general error
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmailPassword = async (email, password) => {
    try {
      setLoading(true);
      console.log("Logging in with email and password...");
      
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("Email login succeeded with user:", result.user);
      
      // Create formatted user
      const formattedUser = formatUserData(result.user);
      setCurrentUser(formattedUser);
      localStorage.setItem('currentUser', JSON.stringify(formattedUser));
      
      return formattedUser;
    } catch (error) {
      console.error('Email login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerWithEmailPassword = async (email, password, name) => {
    try {
      setLoading(true);
      console.log("Registering new user with email and password...");
      
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with display name
      if (name) {
        await updateProfile(result.user, { 
          displayName: name,
          photoURL: `${defaultAvatars.email}&name=${encodeURIComponent(name)}`
        });
      }
      
      console.log("Registration succeeded with user:", result.user);
      
      // Create formatted user
      const formattedUser = formatUserData(result.user);
      setCurrentUser(formattedUser);
      localStorage.setItem('currentUser', JSON.stringify(formattedUser));
      
      return formattedUser;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
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