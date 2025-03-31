import { useState, useEffect } from 'react'
import { motion as Motion } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTheme, THEMES } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

const AuthPage = () => {
  const { theme } = useTheme()
  const { loginWithGoogle, loginWithGithub, loginWithEmailPassword, registerWithEmailPassword, currentUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  
  // Check for GitHub callback
  useEffect(() => {
    if (location.search.includes('code=')) {
      setLoading(true);
      // The GitHub callback is handled in the AuthContext
    }
  }, [location]);
  
  // Redirect already authenticated users
  useEffect(() => {
    if (currentUser) {
      navigate('/events');
    }
  }, [currentUser, navigate]);

  // Get background based on theme
  const getBackground = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'bg-theme-primary';
      case THEMES.PURPLE:
        return 'bg-theme-primary';
      default:
        return 'bg-theme-primary';
    }
  };

  // Get form background based on theme
  const getFormBackground = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'bg-dark-light text-white';
      case THEMES.PURPLE:
        return 'bg-purple-700 text-white';
      default:
        return 'bg-white text-dark';
    }
  };

  // Get input background based on theme
  const getInputBackground = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'bg-dark-darker text-white border-gray-700 placeholder-gray-400';
      case THEMES.PURPLE:
        return 'bg-purple-800 text-white border-purple-600 placeholder-purple-300';
      default:
        return 'bg-gray-50 text-dark border-gray-300 placeholder-gray-500';
    }
  };

  // Get tab text color based on theme
  const getTabTextColor = (isActive) => {
    if (theme === THEMES.PURPLE) {
      return isActive 
        ? 'border-b-2 border-white text-white font-bold' 
        : 'text-purple-200 hover:text-white';
    } else if (theme === THEMES.DARK) {
      return isActive 
        ? 'border-b-2 border-primary text-primary' 
        : 'text-gray-400 hover:text-gray-200';
    } else {
      return isActive 
        ? 'border-b-2 border-primary text-primary' 
        : 'text-gray-500 hover:text-gray-700';
    }
  };

  // Get social button styles based on theme
  const getSocialButtonStyle = (brand) => {
    const baseStyle = 'flex items-center justify-center w-full py-2.5 px-4 mb-3 rounded-md font-medium transition-colors';
    
    const brandColors = {
      google: 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100',
      github: theme === THEMES.LIGHT ? 'bg-gray-900 text-white hover:bg-black' : 'bg-gray-800 text-white hover:bg-gray-700',
    };
    
    return `${baseStyle} ${brandColors[brand]}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      if (isLogin) {
        await loginWithEmailPassword(formData.email, formData.password, formData.name);
      } else {
        await registerWithEmailPassword(formData.email, formData.password, formData.name);
      }
      navigate('/events');
    } catch (error) {
      console.error('Auth error:', error);
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      console.log("Starting Google authentication process");
      const result = await loginWithGoogle();
      
      if (result) {
        console.log("Google authentication successful, navigating to events");
        navigate('/events');
      }
    } catch (error) {
      console.error('Google auth error:', error);
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      console.log("Starting GitHub authentication process");
      const result = await loginWithGithub();
      if (result) {
        console.log("GitHub authentication successful, navigating to events");
        navigate('/events');
      }
    } catch (error) {
      console.error('GitHub auth error:', error);
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className={`py-16 ${getBackground()}`}>
        <div className="container-custom">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              {isLogin ? 'Welcome Back' : 'Join Our Community'}
            </h1>
            <p className="text-theme-secondary max-w-2xl mx-auto">
              {isLogin 
                ? 'Sign in to access your account and connect with events and communities.' 
                : 'Create an account to join events, connect with others, and build meaningful relationships.'}
            </p>
          </div>
        </div>
      </section>

      {/* Auth Section - With gradient */}
      <section className="py-16 bg-gradient-to-b from-theme-primary to-theme-tertiary ">
        <div className="container-custom max-w-md mx-auto">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`rounded-lg shadow-xl overflow-hidden ${getFormBackground()} mt-[-112px]`}
          >
            {/* Auth Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-4 px-6 text-center font-medium ${getTabTextColor(isLogin)}`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-4 px-6 text-center font-medium ${getTabTextColor(!isLogin)}`}
              >
                Sign Up
              </button>
            </div>

            <div className="p-8">
              {/* Error message */}
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              
              {/* Social Login Buttons */}
              <div className="mb-6">
                <button 
                  className={getSocialButtonStyle('google')}
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                  </svg>
                  Continue with Google
                </button>
                <button 
                  className={getSocialButtonStyle('github')}
                  onClick={handleGithubSignIn}
                  disabled={loading}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                  Continue with GitHub
                </button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className={`px-2 ${theme === THEMES.LIGHT ? 'bg-white' : theme === THEMES.DARK ? 'bg-dark-light' : 'bg-purple-700'} ${theme === THEMES.PURPLE ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                    Or continue with email
                  </span>
                </div>
              </div>

              {/* Auth Form */}
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary/50 ${getInputBackground()}`}
                      placeholder="Enter your full name"
                      required={!isLogin}
                    />
                  </div>
                )}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary/50 ${getInputBackground()}`}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="password" className="block text-sm font-medium">
                      Password
                    </label>
                    {isLogin && (
                      <a href="#" className={`text-sm ${theme === THEMES.PURPLE ? 'text-purple-200 hover:text-white' : 'text-primary hover:text-primary-dark'}`}>
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary/50 ${getInputBackground()}`}
                    placeholder={isLogin ? "Enter your password" : "Create a password"}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full py-2.5 px-4 ${theme === THEMES.PURPLE ? 'bg-white text-purple-800' : 'bg-primary text-white'} rounded-md font-medium hover:bg-opacity-90 transition-colors`}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                </button>
              </form>

              <div className="mt-6 text-center text-sm">
                <p>
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={toggleAuthMode}
                    className={`font-medium ${theme === THEMES.PURPLE ? 'text-white hover:text-purple-200' : 'text-primary hover:text-primary-dark'}`}
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            </div>
          </Motion.div>
        </div>
      </section>
    </div>
  )
}

export default AuthPage 