import React, { useContext } from 'react';
import { ThemeContext } from '../../utils/themeContext';

const ThemeSwitcher = () => {
  const { currentTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-switcher d-flex align-items-center">
      <span className="me-2 text-light d-none d-md-inline"></span>
      <div className="btn-group" role="group" aria-label="Theme switcher">
        <button
          type="button"
          className={`btn btn-sm ${currentTheme.name === 'light' ? 'btn-light text-primary' : 'btn-outline-light'}`}
          onClick={() => toggleTheme('light')}
          title="Light Theme"
        >
          <i className="bi bi-brightness-high-fill"></i>
        </button>
        <button
          type="button"
          className={`btn btn-sm ${currentTheme.name === 'dark' ? 'btn-light text-primary' : 'btn-outline-light'}`}
          onClick={() => toggleTheme('dark')}
          title="Dark Theme"
        >
          <i className="bi bi-moon-stars-fill"></i>
        </button>
        <button
          type="button"
          className={`btn btn-sm ${currentTheme.name === 'green' ? 'btn-light text-success' : 'btn-outline-light'}`}
          onClick={() => toggleTheme('green')}
          title="Green Theme"
        >
          <i className="bi bi-flower1"></i>
        </button>
      </div>
    </div>
  );
};

export default ThemeSwitcher; 