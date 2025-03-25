import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import ThemeSwitcher from './ThemeSwitcher';

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-4">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <i className="bi bi-check2-square fs-3 me-2"></i>
          <span className="fw-bold">Advanced Todo App</span>
        </a>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-controls="navbarContent" 
          aria-expanded={isMenuOpen ? "true" : "false"} 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item me-lg-3">
              <ThemeSwitcher />
            </li>
            
            {isAuthenticated ? (
              <>
                <li className="nav-item d-flex align-items-center me-lg-2">
                  <span className="nav-link text-light">
                    <i className="bi bi-person-circle me-1"></i>
                    Welcome, <strong>{user.username}</strong>
                  </span>
                </li>
                <li className="nav-item">
                  <button 
                    className="btn btn-outline-light w-100" 
                    onClick={() => {
                      dispatch(logout());
                      setIsMenuOpen(false);
                    }}
                  >
                    <i className="bi bi-box-arrow-right me-1"></i>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <span className="nav-link text-light">
                  <i className="bi bi-info-circle me-1"></i>
                  Please login to use the app
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;