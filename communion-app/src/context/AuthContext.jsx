import { createContext, useContext, useState, useEffect } from 'react';

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
      console.log("Simulating Google authentication...");
      
      // Create mock Google user with random ID
      const googleUser = {
        uid: 'google-user-' + Math.random().toString(36).substring(2, 7),
        displayName: 'Google Test User',
        email: 'google.user@example.com',
        photoURL: 'https://lh3.googleusercontent.com/a/default-user',
        provider: 'google'
      };
      
      console.log("Mock Google auth success - User:", googleUser);
      setCurrentUser(googleUser);
      localStorage.setItem('currentUser', JSON.stringify(googleUser));
      
      return googleUser;
    } catch (error) {
      console.error('Error in mock Google authentication:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGithub = async () => {
    try {
      setLoading(true);
      console.log("Simulating GitHub authentication...");
      
      // Simple GitHub login with mock data
      const githubUser = {
        uid: 'github-user-' + Math.random().toString(36).substring(2, 7),
        displayName: 'GitHub Test User',
        email: 'github.user@example.com',
        photoURL: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
        provider: 'github'
      };
      
      console.log("Mock GitHub auth success - User:", githubUser);
      setCurrentUser(githubUser);
      localStorage.setItem('currentUser', JSON.stringify(githubUser));
      
      return githubUser;
    } catch (error) {
      console.error('Error in mock GitHub authentication:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmailPassword = async (email, password, name = '') => {
    try {
      setLoading(true);
      console.log("Logging in with email and password...");
      
      // Simple email login with provided info
      const emailUser = {
        uid: 'email-user-' + Math.random().toString(36).substring(2, 7),
        displayName: name || email.split('@')[0],
        email: email,
        photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || email.split('@')[0])}&background=random`,
        provider: 'email'
      };
      
      console.log("Email login success - User:", emailUser);
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
    try {
      setLoading(true);
      console.log("Registering new user with email and password...");
      
      // Just use similar logic as login but with registration messaging
      const newUser = {
        uid: 'email-user-' + Math.random().toString(36).substring(2, 7),
        displayName: name || email.split('@')[0],
        email: email,
        photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || email.split('@')[0])}&background=random`,
        provider: 'email'
      };
      
      console.log("Registration success - User:", newUser);
      setCurrentUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      return newUser;
    } catch (error) {
      console.error('Error registering with email:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log("Logging out user");
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
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