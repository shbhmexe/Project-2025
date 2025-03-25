import React, { createContext, useState, useEffect } from 'react';

// Define theme colors
export const themes = {
  light: {
    name: 'light',
    backgroundColor: 'linear-gradient(135deg, #f5f7fa, #c3cfe2, #e0eafc)', // Soft blue gradient
    textColor: '#212529',
    cardBg: '#ffffff',
    headerBg: '#0d6efd'
  },
  dark: {
    name: 'dark',
    backgroundColor: 'linear-gradient(135deg, #1e2a38, #2c3e50, #1e2a38)', // Dark blue gradient
    textColor: '#f8f9fa',
    cardBg: '#343a40',
    headerBg: '#0d47a1'
  },
  pink: {
    name: 'pink',
    backgroundColor: 'linear-gradient(135deg, #fff0f6, #ffb6c1, #ffa6c9)', // Pink gradient
    textColor: '#212529',
    cardBg: '#ffffff',
    headerBg: '#e83e8c'
  }
};

export const ThemeContext = createContext({
  currentTheme: themes.light,
  toggleTheme: () => {}
});

export const ThemeProvider = ({ children }) => {
  // Get the theme from localStorage if available or use light theme as default
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  // Load theme from localStorage on initial render
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        const parsedTheme = JSON.parse(savedTheme);
        setCurrentTheme(parsedTheme);
      }
    } catch (error) {
      console.error('Error loading theme from localStorage:', error);
      // Fallback to light theme
      setCurrentTheme(themes.light);
    }
  }, []);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('theme', JSON.stringify(currentTheme));
      
      // Update CSS variables
      document.documentElement.style.setProperty('--bg-gradient', currentTheme.backgroundColor);
      document.documentElement.style.setProperty('--text-color', currentTheme.textColor);
      document.documentElement.style.setProperty('--card-bg', currentTheme.cardBg);
      document.documentElement.style.setProperty('--header-bg', currentTheme.headerBg);
      
      // Update body classes for dark mode
      if (currentTheme.name === 'dark') {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      
      // Update cards and form elements separately to avoid errors
      setTimeout(() => {
        try {
          document.querySelectorAll('.card, .form-control, .form-select').forEach(el => {
            if (currentTheme.name === 'dark') {
              el.classList.add('dark-mode');
            } else {
              el.classList.remove('dark-mode');
            }
          });
        } catch (error) {
          console.error('Error updating element classes:', error);
        }
      }, 0);
    } catch (error) {
      console.error('Error saving theme to localStorage:', error);
    }
  }, [currentTheme]);

  // Function to switch themes
  const toggleTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themes[themeName]);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 