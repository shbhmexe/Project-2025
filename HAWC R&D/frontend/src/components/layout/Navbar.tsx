import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Trigger animation after component mounts
    setTimeout(() => setAnimateItems(true), 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 text-indigo-600 backdrop-blur-sm shadow-lg' : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className={`flex-shrink-0 flex items-center space-x-2 transition-all duration-300 ${animateItems ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
              <div className={`relative ${scrolled ? 'text-indigo-600' : 'text-white'} transition-colors duration-300`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
              </div>
              <span className={`font-bold text-xl tracking-tight bg-clip-text ${scrolled ? 'text-transparent bg-gradient-to-r from-indigo-600 to-purple-600' : 'text-white'}`}>CodeIgniter App</span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-all duration-300 ${scrolled ? 'text-indigo-600 hover:text-white hover:bg-indigo-500' : 'text-indigo-100 hover:text-white hover:bg-indigo-500'} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          <div className="hidden sm:flex items-center">
            {isAuthenticated ? (
              <div className={`flex items-center space-x-4 transition-all duration-500 ${animateItems ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                <Link to="/teachers" className={`px-3 py-2 rounded-md text-sm font-medium ${scrolled ? 'text-indigo-600 hover:bg-indigo-500 hover:text-white' : 'hover:bg-indigo-500'} transition duration-300 ease-in-out flex items-center`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Teachers
                </Link>
                <span className={`text-sm px-3 py-1 rounded-full transition-all duration-300 ${scrolled ? 'bg-indigo-100 text-indigo-700' : 'bg-indigo-700 text-white'}`}>
                  Welcome, {user?.first_name}
                </span>
                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-md text-sm font-medium bg-red-500 hover:bg-red-600 transition duration-300 ease-in-out flex items-center shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            ) : (
              <div className={`flex items-center space-x-4 transition-all duration-500 ${animateItems ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                <Link to="/login" className={`px-4 py-2 rounded-md text-sm font-medium ${scrolled ? 'text-indigo-600 hover:bg-indigo-500 hover:text-white' : 'hover:bg-indigo-500'} transition duration-300 ease-in-out flex items-center`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 rounded-md text-sm font-medium bg-white text-indigo-600 hover:bg-gray-100 transition duration-300 ease-in-out shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div className={`sm:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="pt-2 pb-3 space-y-1 px-2">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/teachers" 
                    className={`block px-3 py-2 rounded-md text-base font-medium ${scrolled ? 'text-indigo-600 hover:bg-indigo-500 hover:text-white' : 'text-white hover:bg-indigo-500'} transition-colors duration-300`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Teachers
                  </Link>
                  <div className={`px-3 py-2 text-base font-medium ${scrolled ? 'text-indigo-400' : 'text-indigo-200'} transition-colors duration-300`}>
                    Welcome, {user?.first_name}
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-red-500 hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className={`block px-3 py-2 rounded-md text-base font-medium ${scrolled ? 'text-indigo-600 hover:bg-indigo-500 hover:text-white' : 'text-white hover:bg-indigo-500'} transition-colors duration-300`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className={`block px-3 py-2 rounded-md text-base font-medium ${scrolled ? 'text-indigo-600 hover:bg-indigo-500 hover:text-white' : 'text-white hover:bg-indigo-500'} transition-colors duration-300`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;