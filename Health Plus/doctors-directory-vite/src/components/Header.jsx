import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaGooglePlusG, FaBars, FaTimes } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${theme === "dark" ? "bg-yellow-700 text-gray-900" : "bg-white shadow-md"}`}>

      {/* 🔹 Top Header (Hidden on Mobile) */}
      <div
        className={`w-full ${theme === "light" ? "bg-white-500 text-black" : "bg-yellow-100 text"} text-sm py-2 px-4 flex flex-wrap justify-between items-center max-[430px]:hidden`}
      >
        <div className="flex items-center space-x-2">
          <img src="/1.jpg" alt="Logo" className="w-10 h-10 cursor-pointer" />
          <div className="text-base font-semibold">Health Plus</div>
        </div>

        <div className="flex flex-wrap items-center space-x-4 text-xs">
          <div className="space-x-2">
            <a href="#" className="hover:text-blue-500">Member Login</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-500">Contact Us</a>
          </div>

          <div className="flex space-x-3 text-sm">
            <a href="#" className="text-blue-600"><FaFacebookF /></a>
            <a href="#" className="text-blue-400"><FaTwitter /></a>
            <a href="#" className="text-pink-500"><FaInstagram /></a>
            <a href="#" className="text-blue-700"><FaLinkedin /></a>
            <a href="#" className="text-red-500"><FaGooglePlusG /></a>
          </div>
        </div>
      </div>
      
{/* 🔹 Main Navigation */}
<div className={`${theme === "light" ? "bg-blue-500 text-black" : "bg-yellow-200 text-black"}`}>
  <div className="container mx-auto flex justify-between items-center py-4 px-6 relative">

    {/* 🏥 Health Plus Logo (Extreme Left in Desktop) */}
    <div className="hidden md:flex items-center absolute -left-36">
      <img src="/1.jpg" alt="Health Plus" className="h-10 w-auto rounded-xl" />
    </div>

    {/* 🍔 Mobile Menu Button (Left in Mobile) */}
    <div className="flex items-center md:hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
    </div>

    {/* 🖥️ Desktop Navigation (Centered) */}
    <nav className="hidden md:flex space-x-6 justify-center w-full">
      {["Home", "Doctors", "Hospitals", "Pharmacy", "Diagnostics", "Health Tips", "Contact"].map(
        (item) => (
          <a 
            key={item} 
            href="#" 
            className={`hover:${theme === "dark" ? "text-yellow-500" : "text-blue-200"} transition-colors duration-300`}
          >
            {item}
          </a>
        )
      )}
    </nav>

    {/* 🔥 Desktop Theme Toggle (Right in Desktop) */}
    <div className="hidden md:block absolute right-4">
      <ThemeToggle />
    </div>

    {/* 🌙 Mobile Night Mode (Extreme Right) */}
    <div className="md:hidden absolute right-4">
      <ThemeToggle />
    </div>
  </div>

  {/* 📌 Mobile Navigation (Dropdown) */}
  {isOpen && (
    <div className="md:hidden bg-white text-black p-4 shadow-lg rounded-lg fixed top-16 left-1/2 transform -translate-x-1/2 w-11/12 max-w-sm border border-gray-200 z-50">
      <ul className="space-y-2">
        {["Home", "Doctors", "Hospitals", "Pharmacy", "Diagnostics", "Health Tips", "Contact"].map(
          (item) => (
            <li key={item}>
              <a
                href="#"
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 rounded-md text-lg font-semibold transition-all duration-300 ease-in-out hover:bg-blue-500 hover:text-white hover:pl-6"
              >
                {item}
              </a>
            </li>
          )
        )}
      </ul>
    </div>
  )}
</div>
    </div>
  );
};

export default Header;
