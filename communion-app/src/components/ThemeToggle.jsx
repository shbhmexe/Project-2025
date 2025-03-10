import { useState, useRef, useEffect } from 'react';
import { useTheme, THEMES } from '../context/ThemeContext';
import { SunIcon, MoonIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get the appropriate icon based on the current theme
  const getThemeIcon = (themeName) => {
    switch (themeName) {
      case THEMES.LIGHT:
        return (
          <SunIcon className="w-5 h-5 text-yellow-500" />
        );
      case THEMES.DARK:
        return (
          <MoonIcon className="w-5 h-5 text-blue-400" />
        );
      case THEMES.PURPLE:
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-5 h-5 text-purple-300" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
        );
      default:
        return <SunIcon className="w-5 h-5" />;
    }
  };

  // Get theme name for display
  const getThemeName = (themeName) => {
    switch (themeName) {
      case THEMES.LIGHT:
        return 'Light';
      case THEMES.DARK:
        return 'Dark';
      case THEMES.PURPLE:
        return 'Purple';
      default:
        return 'Light';
    }
  };

  // Get background color based on theme
  const getToggleStyle = () => {
    switch (theme) {
      case THEMES.LIGHT:
        return {
          backgroundColor: '#f3f4f6',
          color: '#111827',
        };
      case THEMES.DARK:
        return {
          backgroundColor: '#1f2937',
          color: '#f9fafb',
        };
      case THEMES.PURPLE:
        return {
          backgroundColor: '#4c1d95',
          color: '#f9fafb',
        };
      default:
        return {};
    }
  };

  // Get dropdown item style based on theme
  const getDropdownItemStyle = (itemTheme) => {
    const isActive = theme === itemTheme;
    
    // Base styles
    let styles = "flex items-center px-4 py-2 text-sm cursor-pointer";
    
    // Active state
    if (isActive) {
      switch (theme) {
        case THEMES.LIGHT:
          return `${styles} bg-blue-50 text-blue-600`;
        case THEMES.DARK:
          return `${styles} bg-gray-700 text-white`;
        case THEMES.PURPLE:
          return `${styles} bg-purple-700 text-white`;
        default:
          return `${styles} bg-blue-50 text-blue-600`;
      }
    }
    
    // Hover state for inactive items
    switch (theme) {
      case THEMES.LIGHT:
        return `${styles} hover:bg-gray-100`;
      case THEMES.DARK:
        return `${styles} hover:bg-gray-700 text-gray-200`;
      case THEMES.PURPLE:
        return `${styles} hover:bg-purple-700 text-purple-200`;
      default:
        return `${styles} hover:bg-gray-100`;
    }
  };

  // Get dropdown background based on theme
  const getDropdownBackground = () => {
    switch (theme) {
      case THEMES.LIGHT:
        return 'bg-white border border-gray-200 shadow-lg';
      case THEMES.DARK:
        return 'bg-gray-800 border border-gray-700 shadow-lg';
      case THEMES.PURPLE:
        return 'bg-purple-900 border border-purple-700 shadow-lg';
      default:
        return 'bg-white border border-gray-200 shadow-lg';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="theme-toggle flex items-center"
        style={getToggleStyle()}
        aria-label="Theme options"
        title="Theme options"
      >
        {getThemeIcon(theme)}
        <ChevronDownIcon className="w-4 h-4 ml-1" />
      </button>
      
      {isOpen && (
        <div className={`absolute right-0 mt-2 w-48 rounded-md overflow-hidden z-50 ${getDropdownBackground()}`}>
          <div className="py-1">
            {Object.values(THEMES).map((themeName) => (
              <div
                key={themeName}
                className={getDropdownItemStyle(themeName)}
                onClick={() => {
                  setTheme(themeName);
                  setIsOpen(false);
                }}
              >
                <span className="mr-2">{getThemeIcon(themeName)}</span>
                {getThemeName(themeName)} Theme
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle; 