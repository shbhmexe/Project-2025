import React, { useState } from "react";
import { doctors } from "./data/doctors";
import Filters from "./components/Filters";
import DoctorCard from "./components/DoctorCard";
import Header from "./components/Header"; 
import Content from "./components/Content";
import Footer from "./components/Footer";
import { ThemeProvider, useTheme } from "./context/ThemeContext"; // Import theme

const AppContent = () => {
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const { theme } = useTheme(); // Get current theme

  const handleFilter = ({ specialty, location, availability, rating }) => {
    const filtered = doctors.filter((doctor) => {
      return (
        (specialty === "" || doctor.specialty === specialty) &&
        doctor.location.toLowerCase().includes(location.toLowerCase()) &&
        (availability === "" ||
          doctor.availability.toLowerCase().includes(availability.toLowerCase())) &&
        (rating === "" || doctor.rating >= parseFloat(rating))
      );
    });
    setFilteredDoctors(filtered);
  };

  return (
    <div
      className={`min-h-screen transition-colors ${
        theme === "yellow"
          ? "bg-yellow-100 text-gray-900"
          : "bg-gradient-to-r from-blue-50 to-green-50"
      }`}
    >
      <Header />
      
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-2">
          Introducing Health Plus - Your Gateway to Quality Healthcare
        </h1>
        <p className="text-lg">
          Simplifying the process of finding trusted healthcare providers in India.
        </p>
      </div>

      <Content />

      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Find a Doctor Near You</h1>
          <p className="max-w-2xl mx-auto">
            Explore expert healthcare services right at your fingertips.
          </p>
        </div>

        <Filters onFilter={handleFilter} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
