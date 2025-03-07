import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext"; // ThemeContext se theme get karo

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Content = () => {
  const { theme } = useTheme(); // Get the current theme

  return (
    <div className={`min-h-screen py-12 px-6 transition-colors duration-500 ${
      theme === "light" ? "bg-gradient-to-br from-blue-100 to-green-100 text-gray-800" : "bg-yellow-200 text-black"
    }`}>
      
      {/* Hero Image */}
      <motion.img
        src="/1.jpg" // Public folder me hone ke karan direct use karo
        alt="Healthcare Hero"
        className="w-72 h-full max-w-4xl mx-auto rounded-lg shadow-lg mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.h1
        className="text-4xl font-extrabold text-center mb-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Introducing Health Plus - Your Gateway to Quality Healthcare
      </motion.h1>
      <p className="text-center mb-12">
        Simplifying the process of finding trusted healthcare providers in India.
      </p>

      <motion.section
        className={`rounded-xl shadow-lg p-8 max-w-3xl mx-auto mb-12 transition-colors duration-500 ${
          theme === "light" ? "bg-white text-gray-600" : "bg-yellow-300 text-gray-900"
        }`}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Our Mission</h2>
        <p className="text-center">
          Our mission is to reduce confusion and promote timely healthcare decisions, helping individuals make informed health choices through DrData.
        </p>
      </motion.section>

      <motion.section
        className={`rounded-xl shadow-lg p-8 max-w-3xl mx-auto mb-12 transition-colors duration-500 ${
          theme === "light" ? "bg-white text-gray-600" : "bg-yellow-300 text-gray-900"
        }`}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Our Vision</h2>
        <p className="text-center">
          We aim to provide easy access to healthcare information and empower individuals to make better health decisions. Our ultimate goal is “Treatment by Choice, Not Chance.”
        </p>
      </motion.section>

      <motion.section
        className="max-w-5xl mx-auto"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "Comprehensive Directory: Search for doctors, hospitals, and clinics.",
            "User-Friendly Interface: Quick and easy navigation.",
            "Real-Time Updates: Always current healthcare information.",
            "Patient Education: Learn which specialists to visit for your health concerns.",
            "Free and Accessible: Open to everyone, with no barriers.",
            "Customizable Search Options: Filter by location, specialty, etc.",
          ].map((feature, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-xl shadow-md text-center hover:shadow-xl transition-shadow duration-300 ${
                theme === "light" ? "bg-white text-gray-700" : "bg-yellow-400 text-black"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {feature}
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Content;
