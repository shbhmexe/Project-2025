import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline'
import ThemeToggle from './ThemeToggle'
import { useTheme, THEMES } from '../context/ThemeContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme } = useTheme();

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
            
            {/* Auth Link */}
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
    </header>
  )
}

export default Header 