import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"; // Backend API URL

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    yourName: "",
    yourEmail: "",
    friendName: "",
    friendEmail: "",
    course: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle Form Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // API Call Function
  const handleReferralSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      userName: formData.yourName,
      userEmail: formData.yourEmail,
      friendName: formData.friendName,
      friendEmail: formData.friendEmail,
      course: formData.course,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/referrals/`, payload);
      setMessage(response.data.message || "Referral sent successfully! ✅");

      // ✅ Success Toast Notification
      toast.success("Referral sent successfully! ✅", {
        position: "top-center",
        autoClose: 3000, // 3 sec baad close hoga
      });

      // Reset form after success
      setFormData({ yourName: "", yourEmail: "", friendName: "", friendEmail: "", course: "" });

      // Close modal after 2 seconds
      setTimeout(() => setIsModalOpen(false), 2000);
    } catch (error) {
      console.error("Error sending referral:", error.response?.data || error);
      setMessage(error.response?.data?.message || "Failed to send referral. ❌");

      // ❌ Error Toast Notification
      toast.error("Failed to send referral. ❌", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-blue-50 dark:bg-gray-700 rounded-3xl overflow-hidden my-6 mx-auto max-w-7xl transition mb-16 mt-10">
      <div className="flex flex-col md:flex-row items-center px-8 py-12 md:py-8 relative">

        {/* Left Content */}
        <div className="md:w-1/2 z-10 mb-8 md:mb-0 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
            Let's Learn &amp; Earn
          </h1>
          <p className="text-xl text-gray-800 dark:text-gray-300 mb-2">Get a chance to earn</p>
          <p className="text-3xl font-bold text-blue-500 dark:text-blue-400 mb-2">₹10,000</p>
          <p className="text-xl text-gray-800 dark:text-gray-300 mb-8">
            for every friend who enrolls!
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-md transition duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            Refer Now
          </button>
        </div>

        {/* Right Content - Full Image */}
        <div className="md:w-1/2 flex justify-center items-center relative">
          <img
            src="https://s3-alpha-sig.figma.com/img/6da5/530f/c90be82b93f2066608be1f96ef347467?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HvksDg7T0LYUOHyxT~iVlCN70n51xvwbxWkUQMlpKqm5DcBwCoLfRGDRHQHnYLQIky0ps7bFzaGRXS~Li1735L9Sjqnnit4qZx7c09Or5D38idEJGw1L1zP~Do9ILaZflh1LQS9Rie5HJfzsYEx920jw9TOeFDpwL-SX3S~6p5nBnZsw1KjP4O7WLauroSwctv54uSC1fGN~~RIgmlvUU76B4QEck5wnapZapc~gazWRH9rLG45Phhqx07U-yN2AGIrVt7nmgqJABgWgtYkO4WDypUXdWG3gMP8P5JO4cBnKvvWMBCZkD9QaEgzZeGwYqV561xLHLNMPwbKVJs-6cQ__"
            alt="Hero Section Image"
            className="w-auto h-full object-contain md:block hidden"
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg relative">

            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
              onClick={() => setIsModalOpen(false)}
            >
              ✖
            </button>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-4">
              Refer a Friend
            </h2>

            {/* Referral Form */}
            <form className="space-y-4" onSubmit={handleReferralSubmit}>

              {/* Your Name */}
              <input
                type="text"
                name="yourName"
                value={formData.yourName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
                required
              />

              {/* Your Email */}
              <input
                type="email"
                name="yourEmail"
                value={formData.yourEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                placeholder="Your Email"
                required
              />

              {/* Friend's Name */}
              <input
                type="text"
                name="friendName"
                value={formData.friendName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                placeholder="Friend's Name"
                required
              />

              {/* Friend's Email */}
              <input
                type="email"
                name="friendEmail"
                value={formData.friendEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                placeholder="Friend's Email"
                required
              />

              {/* Course Selection */}
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>Select a course</option>
                <option value="MERN Stack Development">MERN Stack Development</option>
                <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Cybersecurity Basics">Cybersecurity Basics</option>
              </select>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded text-white transition duration-300 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                  }`}
              >
                {loading ? "Sending..." : "Send Referral"}
              </button>
            </form>

            {/* Message Display */}
            {message && <p className="text-center text-green-600 mt-2">{message}</p>}
          </div>
        </div>
      )}

    </div>
  );
};

export default HeroSection;
