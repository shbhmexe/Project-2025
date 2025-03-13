import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-background">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-brand-primary">
              Coupon Distribution
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-brand-primary transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/coupons" 
                className="text-gray-700 hover:text-brand-primary transition-colors"
              >
                Coupons
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-brand-primary focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-2 py-3 border-t border-gray-200">
              <div className="flex flex-col space-y-3">
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-brand-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/coupons" 
                  className="text-gray-700 hover:text-brand-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Coupons
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        {children}
      </main>
      
      <footer className="bg-white py-4 shadow-md mt-auto">
        <div className="container mx-auto px-4">
          <p className="text-gray-600 text-center">
            © {new Date().getFullYear()} Coupon Distribution App
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout; 