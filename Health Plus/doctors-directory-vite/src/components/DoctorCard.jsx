import React, { useState } from "react";
import { FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";
import DoctorReviews from "./DoctorReviews";
import DoctorAvailability from "./DoctorAvailability";
import { useTheme } from "../context/ThemeContext"; // Import Theme Context

const DoctorCard = ({ doctor }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme(); // Get current theme

  return (
    <motion.div
      className={`relative border rounded-lg shadow-lg p-6 text-center transition-transform hover:shadow-2xl 
        ${theme === "dark" ? "bg-yellow-600 text-gray-900 border-yellow-500" : " text-gray-800 border-gray-200"}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      {!isHovered ? (
        <>
          <img
            src={doctor.image || "https://via.placeholder.com/100"}
            alt={doctor.name}
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold">{doctor.name}</h3>
          <p className="text-sm">{doctor.specialty}</p>
          <p className="text-sm">{doctor.location}</p>

          {/* ✅ Short Description */}
          <p className="text-xs text-gray-600 mt-2">{doctor.shortDescription}</p>

          {/* ✅ Clinic Timing */}
          <p className="text-sm font-semibold text-blue-600 mt-1">
            {doctor.clinicTiming}
          </p>

          {/* ✅ Full Description */}
          <p className="text-xs text-gray-700 mt-2 italic">{doctor.description}</p>

          {/* Using DoctorReviews component */}
          <DoctorReviews rating={doctor.rating} />

          {/* Using DoctorAvailability component */}
          <DoctorAvailability availability={doctor.availability} />
        </>
      ) : (
        <motion.div
          className={`absolute inset-0 flex flex-col items-center justify-center p-4 rounded-lg 
            ${theme === "dark" ? "bg-yellow-700 text-gray-900" : "bg-white text-gray-800"}
          `}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h3 className="text-xl font-semibold">{doctor.name}</h3>
          <p className="text-sm">{doctor.specialty}</p>

          
          {doctor.phone && (
            <div className="flex items-center gap-2 mt-2 p-2 bg-gray-100 rounded-lg shadow-md">
              {/* <FaPhone className="text-blue-500 text-2xl flex-shrink-0" /> */}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-blue-600 w-6 h-6 flex-shrink-0"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 5.25A3 3 0 0 1 5.25 2.25h2.17a2.25 2.25 0 0 1 2.11 1.47l1.07 3.2a2.25 2.25 0 0 1-.52 2.35l-1.33 1.34a12.06 12.06 0 0 0 5.25 5.25l1.34-1.33a2.25 2.25 0 0 1 2.35-.52l3.2 1.07a2.25 2.25 0 0 1 1.47 2.11v2.17a3 3 0 0 1-3 3h-2.5C8.268 21 3 15.732 3 9.25V6.75a3 3 0 0 1 .25-1.5z"
                  clipRule="evenodd"
                />
              </svg> 

              <p className="text-base font-medium text-gray-900">{doctor.phone}</p>
            </div>
          )}

          {/* ✅ Book Appointment Button */}
          <button
            className={`mt-4 px-4 py-2 rounded-lg transition-colors ${theme === "dark"
                ? "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
                : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
          >
            Book Appointment
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DoctorCard;
