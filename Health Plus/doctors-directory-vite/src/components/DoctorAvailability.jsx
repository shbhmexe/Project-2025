import React from "react";

const DoctorAvailability = ({ availability }) => {
  const getColor = () => {
    if (availability === "Available Today") return "text-green-500";
    if (availability === "Available Next Week") return "text-orange-500";
    return "text-gray-500";
  };

  return <p className={`text-sm font-semibold ${getColor()}`}>{availability}</p>;
};

export default DoctorAvailability;
