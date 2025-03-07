import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"; // Backend API URL

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("refer");
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
      
      // ✅ Success Toast Notification
      toast.success("Referral sent successfully! ✅", {
        position: "top-center",
        autoClose: 3000, // 3 sec baad close hoga
      });

      setMessage(response.data.message || "Referral sent successfully! ✅");
      setFormData({ yourName: "", yourEmail: "", friendName: "", friendEmail: "", course: "" });
      setTimeout(() => setIsModalOpen(false), 2000);
    } catch (error) {
      console.error("Error sending referral:", error.response?.data || error);

      // ❌ Error Toast Notification
      toast.error("Failed to send referral. ❌", {
        position: "top-center",
        autoClose: 3000,
      });

      setMessage(error.response?.data?.message || "Failed to send referral. ❌");
    } finally {
      setLoading(false);
    }
  };


  return (
    <header className="w-full bg-white dark:bg-gray-900 transition border-b-0">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <div>
            <div className="text-blue-500 dark:text-white font-bold text-2xl">
              assessian
            </div>
            <span className="text-gray-500 dark:text-gray-300 text-xs block ml-0">
              credentials that matter
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/business" className="text-gray-700 dark:text-white">For Business</a>
          <a href="/resources" className="text-gray-700 dark:text-white">Resources</a>
          <a href="/about" className="text-gray-700 dark:text-white">About Us</a>
          <a href="/more" className="text-gray-700 dark:text-white">More</a>
          <a href="/login" className="text-gray-700 dark:text-white">Login</a>
          <div className="mr-2 hidden md:block">
            <ThemeToggle />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-6 py-2 rounded-md"
          >
            Refer now
          </button>
        </nav>

        {/* Mobile Menu + Theme Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 dark:text-white">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 px-4 py-3 space-y-2">
          <a href="/business" className="block text-gray-700 dark:text-white">For Business</a>
          <a href="/resources" className="block text-gray-700 dark:text-white">Resources</a>
          <a href="/about" className="block text-gray-700 dark:text-white">About Us</a>
          <a href="/more" className="block text-gray-700 dark:text-white">More</a>
          <a href="/login" className="block text-gray-700 dark:text-white">Login</a>
          <button
            onClick={() => setIsModalOpen(true)}
            className="block w-full bg-blue-500 text-white text-center px-6 py-2 rounded-md"
          >
            Refer now
          </button>
        </div>
      )}

{isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96 relative">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-white">
        Refer a Friend
      </h2>
      <form onSubmit={handleReferralSubmit} className="space-y-4">
        
        {/* Your Name */}
        <input 
          type="text" 
          name="yourName" 
          placeholder="Your Name" 
          value={formData.yourName} 
          onChange={handleChange} 
          className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500" 
          required 
        />

        {/* Your Email */}
        <input 
          type="email" 
          name="yourEmail" 
          placeholder="Your Email" 
          value={formData.yourEmail} 
          onChange={handleChange} 
          className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500" 
          required 
        />

        {/* Friend's Name */}
        <input 
          type="text" 
          name="friendName" 
          placeholder="Friend's Name" 
          value={formData.friendName} 
          onChange={handleChange} 
          className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500" 
          required 
        />

        {/* Friend's Email */}
        <input 
          type="email" 
          name="friendEmail" 
          placeholder="Friend's Email" 
          value={formData.friendEmail} 
          onChange={handleChange} 
          className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500" 
          required 
        />

        {/* Course Selection */}
        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
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
          className={`w-full py-2 rounded text-white transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Sending..." : "Send Referral"}
        </button>

        {/* Message Display */}
        {message && <p className="text-center mt-2 text-gray-900 dark:text-white">{message}</p>}
      </form>

      {/* Close Button */}
      <button 
        onClick={() => setIsModalOpen(false)} 
        className="mt-4 w-full bg-gray-300 text-black py-2 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition"
      >
        Close
      </button>
    </div>
  </div>
)}

    </header>
  );
};

export default Header;
