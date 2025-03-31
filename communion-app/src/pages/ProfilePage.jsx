import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme, THEMES } from '../context/ThemeContext';

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If no user is logged in, redirect to auth page
    if (!currentUser) {
      navigate('/auth');
      return;
    }
    
    setLoading(false);
  }, [currentUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Get background based on theme
  const getBackground = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'bg-gray-900';
      case THEMES.PURPLE:
        return 'bg-purple-900';
      default:
        return 'bg-gray-100';
    }
  };

  // Get section background based on theme
  const getSectionBackground = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'bg-gray-800';
      case THEMES.PURPLE:
        return 'bg-purple-800';
      default:
        return 'bg-white';
    }
  };

  // Get text color based on theme
  const getTextColor = () => {
    switch (theme) {
      case THEMES.DARK:
      case THEMES.PURPLE:
        return 'text-white';
      default:
        return 'text-gray-900';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${getBackground()}`}>
      <div className="container mx-auto px-4 py-16">
        <div className={`max-w-2xl mx-auto rounded-lg shadow-xl overflow-hidden ${getSectionBackground()}`}>
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-primary to-secondary">
            <div className="absolute left-0 right-0 -bottom-20 flex justify-center">
              <div className="w-40 h-40 rounded-full p-2 bg-white">
                {currentUser.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt={currentUser.displayName} 
                    className="rounded-full w-full h-full object-cover"
                  />
                ) : (
                  <div className="rounded-full w-full h-full bg-primary flex items-center justify-center text-white text-4xl">
                    {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className={`pt-24 pb-10 px-8 ${getTextColor()}`}>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">{currentUser.displayName}</h1>
              <p className="opacity-80">{currentUser.email}</p>
              <div className="mt-2">
                <span className="px-3 py-1 text-xs rounded-full bg-primary text-white">
                  {currentUser.provider?.charAt(0).toUpperCase() + currentUser.provider?.slice(1) || 'Email'} User
                </span>
              </div>
            </div>

            {/* Additional User Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className={`p-4 rounded-lg ${theme === THEMES.DARK ? 'bg-gray-700' : theme === THEMES.PURPLE ? 'bg-purple-700' : 'bg-gray-100'}`}>
                <h3 className="font-semibold mb-2">Account ID</h3>
                <p className="text-sm opacity-80 break-all">{currentUser.uid}</p>
              </div>
              <div className={`p-4 rounded-lg ${theme === THEMES.DARK ? 'bg-gray-700' : theme === THEMES.PURPLE ? 'bg-purple-700' : 'bg-gray-100'}`}>
                <h3 className="font-semibold mb-2">Authentication Method</h3>
                <p className="text-sm opacity-80">
                  {currentUser.provider === 'google' 
                    ? 'Google Authentication' 
                    : currentUser.provider === 'github' 
                      ? 'GitHub Authentication' 
                      : 'Email & Password'}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center">
              <button 
                onClick={handleLogout}
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 