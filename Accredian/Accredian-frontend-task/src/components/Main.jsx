import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ReferralProcess = () => {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    <div className="w-full bg-white dark:bg-gray-900 rounded-3xl overflow-hidden my-6 mx-auto max-w-7xl p-6">
      <h2 className="text-center text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        How Do I <span className="text-blue-500">Refer?</span>
      </h2>

      <div className="flex justify-center md:flex-row flex-col items-center">
        <img
          src="https://s3-alpha-sig.figma.com/img/f8bf/9271/2c05e77a4b76d26c35bb05a554cb6838?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=WknF9S~GKCMLbkO8~auWf9lBB309mnuQexRJxICPEmHYH4I-w4DkY6ZSXj8gW8ChALNyB2dr~vKxk2GDfkBxVaJPZKNFDwqnqAJXRPxfVUA1-iWd89MMgIzhmiiC73lTQtAwb2GOsnKPCKdZxdnT3lduuWK7wzfMS0HpMPMYXfdKe9kaGBx0xsEgwO~iVwGTMyqTNriI4257M1HFnpfMBNuUU4qVXtcqbzcEFFxcxTSWn2RfGc44QjE9cf3iHQzUPzvIxnpggptvp1No6fDfoiWZG094Dlz1y71uLgX0RGMTg81BrOmvQg07b0RYEZlfxvJtgXvCOP6XknwGrNxFKw__"
          alt="Referral Process"
          className="w-full h-auto md:w-1/2"
        />
      </div>

      <div className="flex justify-center mt-6">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-md transition duration-300"
          onClick={() => setIsModalOpen(true)}
        >
          Refer Now
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500"
              onClick={() => setIsModalOpen(false)}
            >
              ✖
            </button>

            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 text-center mb-4">
              Refer a Friend
            </h2>

            {/* Referral Form */}
            <form className="space-y-4" onSubmit={handleReferralSubmit}>
              <input
                type="text"
                name="yourName"
                value={formData.yourName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border dark:border-gray-600 focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Your Name"
                required
              />

              <input
                type="email"
                name="yourEmail"
                value={formData.yourEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border dark:border-gray-600 focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Your Email"
                required
              />

              <input
                type="text"
                name="friendName"
                value={formData.friendName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border dark:border-gray-600 focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Friend's Name"
                required
              />

              <input
                type="email"
                name="friendEmail"
                value={formData.friendEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border dark:border-gray-600 focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Friend's Email"
                required
              />

              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>Select a course</option>
                <option value="MERN Stack Development">MERN Stack Development</option>
                <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Cybersecurity Basics">Cybersecurity Basics</option>
              </select>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md transition duration-300"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Referral"}
              </button>
            </form>

            {message && <p className="text-center text-green-600 dark:text-green-400 mt-2">{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferralProcess;
