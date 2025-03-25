import React, { useContext } from 'react';
import { ThemeContext } from '../../utils/themeContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { currentTheme } = useContext(ThemeContext);
  
  const isDarkMode = currentTheme.name === 'dark';
  const isGreenMode = currentTheme.name === 'green';
  
  const getFooterClasses = () => {
    if (isDarkMode) return 'footer py-3 shadow-sm mt-4 bg-dark text-light';
    if (isGreenMode) return 'footer py-3 shadow-sm mt-4';
    return 'footer py-3 shadow-sm mt-4 bg-light';
  };
  
  const getLinkClasses = () => {
    if (isDarkMode) return 'text-light';
    if (isGreenMode) return 'text-success';
    return 'text-muted';
  };
  
  return (
    <footer className={getFooterClasses()}>
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center">
          <div className="col-md-6 d-flex align-items-center">
            <span className={getLinkClasses()}>
              <i className={`bi bi-check2-square me-2 ${isGreenMode ? 'text-success' : ''}`}></i>
              Advanced Todo App &copy; {currentYear}
            </span>
          </div>
          <ul className="nav col-md-6 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <a 
                className={getLinkClasses()} 
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
                className={getLinkClasses()} 
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
                className={getLinkClasses()} 
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