import React from "react";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <div className={`py-6 flex ${theme === "light" ? "bg-blue-500 text-black" : "bg-yellow-200 text"}`}>
      <div className="container mx-auto text-center">
        <p className="text-sm">© 2023 health plus. All rights reserved.</p>
        <p className="text-sm mt-2">Made with ❤️ Health Plus</p>
      </div>
    </div>
  );
};

export default Footer;
