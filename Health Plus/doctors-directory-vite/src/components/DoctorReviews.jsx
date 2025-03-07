import React from "react";
import { FaStar } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext"; // Import theme context

const DoctorReviews = ({ rating }) => {
  const { theme } = useTheme(); // Get current theme

  return (
    <div
      className={`flex items-center gap-1 ${
        theme === "light" ? "text-green-500" : "text-yellow-700"
      }`}
    >
      <FaStar />
      <span className="text-sm font-semibold">{rating}</span>
    </div>
  );
};

export default DoctorReviews;
