import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext"; // Import theme context

const Filters = ({ onFilter }) => {
  const { theme } = useTheme(); // Get current theme
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("");
  const [rating, setRating] = useState("");

  const specialties = [
    "Cardiologist",
    "Dermatologist",
    "General Practitioner",
    "Pediatrician",
    "Orthopedic Surgeon",
    "Gynecologist",
    "Neurologist",
    "Oncologist",
    "Pulmonologist",
  ];

  const handleFilter = () => {
    onFilter({ specialty, location, availability, rating });
  };

  // Apply yellow theme styles only when theme is yellow
  const isYellowTheme = theme === "yellow";

  return (
    <div
      className={`p-6 rounded-lg shadow-sm mb-8 ${
        isYellowTheme
          ? "bg-yellow-200"
          : theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-gray-100"
      }`}
    >
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        {/* Specialty Dropdown */}
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className={`p-2 border rounded-lg focus:outline-none focus:ring-2 w-full md:w-auto ${
            isYellowTheme
              ? "border-yellow-500 focus:ring-yellow-400 bg-white"
              : theme === "dark"
              ? "border-gray-600 focus:ring-gray-400 bg-gray-900 text-white"
              : "border-gray-300 focus:ring-blue-400 bg-white"
          }`}
        >
          <option value="">Specialty</option>
          {specialties.map((spec, index) => (
            <option key={index} value={spec}>
              {spec}
            </option>
          ))}
        </select>

        {/* Location Input */}
        <input
          type="text"
          placeholder="City or Zip Code"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={`p-2 border rounded-lg focus:outline-none focus:ring-2 w-full md:w-auto ${
            isYellowTheme
              ? "border-yellow-500 focus:ring-yellow-400 bg-white"
              : theme === "dark"
              ? "border-gray-600 focus:ring-gray-400 bg-gray-900 text-white"
              : "border-gray-300 focus:ring-blue-400 bg-white"
          }`}
        />

        {/* Availability Dropdown */}
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className={`p-2 border rounded-lg focus:outline-none focus:ring-2 w-full md:w-auto ${
            isYellowTheme
              ? "border-yellow-500 focus:ring-yellow-400 bg-white"
              : theme === "dark"
              ? "border-gray-600 focus:ring-gray-400 bg-gray-900 text-white"
              : "border-gray-300 focus:ring-blue-400 bg-white"
          }`}
        >
          <option value="">Availability</option>
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="next-week">Next Week</option>
        </select>

        {/* Rating Dropdown */}
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className={`p-2 border rounded-lg focus:outline-none focus:ring-2 w-full md:w-auto ${
            isYellowTheme
              ? "border-yellow-500 focus:ring-yellow-400 bg-white"
              : theme === "dark"
              ? "border-gray-600 focus:ring-gray-400 bg-gray-900 text-white"
              : "border-gray-300 focus:ring-blue-400 bg-white"
          }`}
        >
          <option value="">Rating</option>
          <option value="4.5">4.5+</option>
          <option value="4.0">4.0+</option>
          <option value="3.5">3.5+</option>
        </select>

        {/* Apply Filters Button */}
        <button
          onClick={handleFilter}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors w-full md:w-auto ${
            isYellowTheme
              ? "bg-yellow-500 hover:bg-yellow-600 text-black"
              : theme === "dark"
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          <FaFilter /> Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
