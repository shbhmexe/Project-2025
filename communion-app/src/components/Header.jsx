import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline'
import ThemeToggle from './ThemeToggle'
import { useTheme, THEMES } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const { theme } = useTheme();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const closeProfileMenu = () => {
    setIsProfileMenuOpen(false);
  };

  const handleLogout = () => {
    closeProfileMenu();
    logout();
    navigate('/');
  };

  // Get hamburger icon color based on theme
  const getHamburgerColor = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'text-white';
      case THEMES.PURPLE:
        return 'text-white';
      default:
        return 'text-dark';
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'backdrop-blur-sm bg-opacity-70 shadow-md py-3' 
          : 'py-5'
      }`}
      style={{ 
        backgroundColor: isScrolled 
          ? theme === THEMES.DARK 
            ? 'rgba(17, 24, 39, 0.7)' 
            : theme === THEMES.PURPLE 
              ? 'rgba(88, 28, 135, 0.7)' 
              : 'rgba(255, 255, 255, 0.7)' 
          : 'transparent' 
      }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo and Mobile Actions (Left Side) */}
          <div className="flex items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center mr-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Communion
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? "nav-link-active" : "nav-link"
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/events" 
              className={({ isActive }) => 
                isActive ? "nav-link-active" : "nav-link"
              }
            >
              Events
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                isActive ? "nav-link-active" : "nav-link"
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/community" 
              className={({ isActive }) => 
                isActive ? "nav-link-active" : "nav-link"
              }
            >
              Community
            </NavLink>
            <NavLink 
              to="/blog" 
              className={({ isActive }) => 
                isActive ? "nav-link-active" : "nav-link"
              }
            >
              Blogs
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                isActive ? "nav-link-active" : "nav-link"
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Actions (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Auth Link or User Profile */}
            {currentUser ? (
              <div className="relative">
                <button 
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2 nav-link"
                >
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt={currentUser.displayName} 
                      className="w-8 h-8 rounded-full border-2 border-primary"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                      {currentUser.displayName?.charAt(0) || 'U'}
                    </div>
                  )}
                  <span>{currentUser.displayName}</span>
                </button>
                
                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-48 py-2 rounded-md shadow-xl z-50"
                    style={{ 
                      backgroundColor: theme === THEMES.DARK 
                        ? 'rgb(31, 41, 55)' 
                        : theme === THEMES.PURPLE 
                          ? 'rgb(107, 33, 168)' 
                          : 'rgb(255, 255, 255)',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                  >
                    <div className="px-4 py-2 text-sm border-b border-gray-200 dark:border-gray-700">
                      Signed in as<br />
                      <span className="font-medium">{currentUser.email}</span>
                    </div>
                    <Link to="/profile" className="block px-4 py-2 text-sm nav-link hover:bg-opacity-10 hover:bg-gray-200" onClick={closeProfileMenu}>
                      Your Profile
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm nav-link hover:bg-opacity-10 hover:bg-gray-200" onClick={closeProfileMenu}>
                      Settings
                    </Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm nav-link hover:bg-opacity-10 hover:bg-gray-200">
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink 
                to="/auth" 
                className={({ isActive }) => 
                  isActive 
                    ? "nav-link-active flex items-center" 
                    : "nav-link flex items-center"
                }
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Sign In
              </NavLink>
            )}
            
            {/* CTA Button */}
            <Link to="/events" className="btn-primary text-sm px-4 py-2">
              Join Event
            </Link>
          </div>

          {/* Mobile Actions (Right Side) */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Theme Toggle */}
            <ThemeToggle />
            
            {/* Mobile Auth Link */}
            {currentUser ? (
              <button
                onClick={toggleProfileMenu}
                className={`${getHamburgerColor()} flex items-center`}
              >
                {currentUser.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt={currentUser.displayName} 
                    className="w-7 h-7 rounded-full border-2 border-primary"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white">
                    {currentUser.displayName?.charAt(0) || 'U'}
                  </div>
                )}
              </button>
            ) : (
              <NavLink 
                to="/auth" 
                className={({ isActive }) => 
                  isActive 
                    ? `${getHamburgerColor()} flex items-center` 
                    : `${getHamburgerColor()} flex items-center`
                }
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </NavLink>
            )}
            
            {/* Mobile Menu Button */}
            <button 
              className={`focus:outline-none ${getHamburgerColor()}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full shadow-lg backdrop-blur-sm" 
          style={{ 
            backgroundColor: theme === THEMES.DARK 
              ? 'rgba(17, 24, 39, 0.9)' 
              : theme === THEMES.PURPLE 
                ? 'rgba(88, 28, 135, 0.9)' 
                : 'rgba(255, 255, 255, 0.9)' 
          }}
        >
          <div className="container-custom py-4 space-y-3">
            <NavLink 
              to="/" 
              onClick={closeMenu}
              className={({ isActive }) => 
                isActive 
                  ? "block px-3 py-2 rounded-md font-medium nav-link-active" 
                  : "block px-3 py-2 rounded-md nav-link hover:bg-opacity-10 hover:bg-gray-200"
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/events" 
              onClick={closeMenu}
              className={({ isActive }) => 
                isActive 
                  ? "block px-3 py-2 rounded-md font-medium nav-link-active" 
                  : "block px-3 py-2 rounded-md nav-link hover:bg-opacity-10 hover:bg-gray-200"
              }
            >
              Events
            </NavLink>
            <NavLink 
              to="/about" 
              onClick={closeMenu}
              className={({ isActive }) => 
                isActive 
                  ? "block px-3 py-2 rounded-md font-medium nav-link-active" 
                  : "block px-3 py-2 rounded-md nav-link hover:bg-opacity-10 hover:bg-gray-200"
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/community" 
              onClick={closeMenu}
              className={({ isActive }) => 
                isActive 
                  ? "block px-3 py-2 rounded-md font-medium nav-link-active" 
                  : "block px-3 py-2 rounded-md nav-link hover:bg-opacity-10 hover:bg-gray-200"
              }
            >
              Community
            </NavLink>
            <NavLink 
              to="/blog" 
              onClick={closeMenu}
              className={({ isActive }) => 
                isActive 
                  ? "block px-3 py-2 rounded-md font-medium nav-link-active" 
                  : "block px-3 py-2 rounded-md nav-link hover:bg-opacity-10 hover:bg-gray-200"
              }
            >
              blogs
            </NavLink>
            <NavLink 
              to="/contact" 
              onClick={closeMenu}
              className={({ isActive }) => 
                isActive 
                  ? "block px-3 py-2 rounded-md font-medium nav-link-active" 
                  : "block px-3 py-2 rounded-md nav-link hover:bg-opacity-10 hover:bg-gray-200"
              }
            >
              Contact
            </NavLink>
            <NavLink 
              to="/auth" 
              onClick={closeMenu}
              className={({ isActive }) => 
                isActive 
                  ? "block px-3 py-2 rounded-md font-medium nav-link-active" 
                  : "block px-3 py-2 rounded-md nav-link hover:bg-opacity-10 hover:bg-gray-200"
              }
            >
              Sign In
            </NavLink>
            <div className="pt-2">
              <Link 
                to="/events" 
                onClick={closeMenu}
                className="btn-primary w-full justify-center text-sm"
              >
                Join Event
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Profile Menu */}
      {isProfileMenuOpen && currentUser && (
        <div className="md:hidden absolute top-full right-0 mt-1 w-60 py-2 rounded-md shadow-xl z-50 mr-4"
          style={{ 
            backgroundColor: theme === THEMES.DARK 
              ? 'rgb(31, 41, 55)' 
              : theme === THEMES.PURPLE 
                ? 'rgb(107, 33, 168)' 
                : 'rgb(255, 255, 255)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
        >
          <div className="px-4 py-2 text-sm border-b border-gray-200 dark:border-gray-700">
            <div className="font-medium">{currentUser.displayName}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{currentUser.email}</div>
          </div>
          <Link to="/profile" className="block px-4 py-2 text-sm nav-link hover:bg-opacity-10 hover:bg-gray-200" onClick={closeProfileMenu}>
            Your Profile
          </Link>
          <Link to="/settings" className="block px-4 py-2 text-sm nav-link hover:bg-opacity-10 hover:bg-gray-200" onClick={closeProfileMenu}>
            Settings
          </Link>
          <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm nav-link hover:bg-opacity-10 hover:bg-gray-200">
            Sign Out
          </button>
        </div>
      )}
    </header>
  )
}

export default Header 