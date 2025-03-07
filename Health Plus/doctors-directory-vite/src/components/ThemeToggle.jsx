import { useTheme } from "../context/ThemeContext";
import { BsSun, BsMoon } from "react-icons/bs";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 flex items-center space-x-2 rounded-lg bg-yellow-500 text-black hover:bg-yellow-600 transition"
    >
      {theme === "light" ? <BsMoon /> : <BsSun />}
      <span>{theme === "light" ? "Night Mode" : "Light Mode"}</span>
    </button>
  );
};

export default ThemeToggle;
