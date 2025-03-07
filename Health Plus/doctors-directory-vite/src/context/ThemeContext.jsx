import { createContext, useContext, useState, useEffect } from "react";

// Context Create Karo
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Local storage se theme le raha hai ya default "light" hai
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "yellow") {
      document.documentElement.classList.add("yellow-theme");
      document.documentElement.classList.remove("light-theme");
    } else {
      document.documentElement.classList.add("light-theme");
      document.documentElement.classList.remove("yellow-theme");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle function to switch between Light & Yellow Theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "yellow" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use Theme
export const useTheme = () => useContext(ThemeContext);
