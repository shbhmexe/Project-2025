import React, { useContext } from 'react';
import { ThemeContext } from '../../utils/themeContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { currentTheme } = useContext(ThemeContext);
  
  const isDarkMode = currentTheme.name === 'dark';
  
  return (
    <footer className={`footer py-3 shadow-sm mt-4 ${isDarkMode ? 'bg-dark text-light' : 'bg-light'}`}>
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center">
          <div className="col-md-6 d-flex align-items-center">
            <span className={isDarkMode ? 'text-light' : 'text-muted'}>
              <i className="bi bi-check2-square me-2"></i>
              Advanced Todo App &copy; {currentYear}
            </span>
          </div>
          <ul className="nav col-md-6 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <a 
                className={isDarkMode ? 'text-light' : 'text-muted'} 
                href="https://github.com/shbhmexe" 
                target="_blank" 
                rel="noopener noreferrer"
                title="GitHub"
              >
                <i className="bi bi-github fs-5"></i>
              </a>
            </li>
            <li className="ms-3">
              <a 
                className={isDarkMode ? 'text-light' : 'text-muted'} 
                href="https://www.linkedin.com/in/shubham-shukla-62095032a/" 
                target="_blank" 
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                <i className="bi bi-linkedin fs-5"></i>
              </a>
            </li>
            <li className="ms-3">
              <a 
                className={isDarkMode ? 'text-light' : 'text-muted'} 
                href="https://www.instagram.com/shbhm.exe/" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Instagram"
              >
                <i className="bi bi-instagram fs-5"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;