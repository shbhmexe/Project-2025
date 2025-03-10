import React, { createContext, useState, useEffect, useContext } from 'react';

// Available themes
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  PURPLE: 'purple' // Custom theme
};

// Create context
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Provider component
export const ThemeProvider = ({ children }) => {
  // Get theme from localStorage or use default (light)
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || THEMES.LIGHT;
  });

  // Update theme in localStorage and document when it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    // Remove all theme classes
    document.documentElement.classList.remove(
      THEMES.LIGHT, 
      THEMES.DARK, 
      THEMES.PURPLE
    );
    
    // Add current theme class
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Toggle between themes
  const toggleTheme = () => {
    setTheme(prevTheme => {
      switch (prevTheme) {
        case THEMES.LIGHT:
          return THEMES.DARK;
        case THEMES.DARK:
          return THEMES.PURPLE;
        case THEMES.PURPLE:
          return THEMES.LIGHT;
        default:
          return THEMES.LIGHT;
      }
    });
  };

  // Set a specific theme
  const setSpecificTheme = (newTheme) => {
    if (Object.values(THEMES).includes(newTheme)) {
      setTheme(newTheme);
    }
  };

  const value = {
    theme,
    toggleTheme,
    setTheme: setSpecificTheme,
    themes: THEMES
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext; 