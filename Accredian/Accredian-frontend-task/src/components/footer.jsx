import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          
          {/* Left - Brand Name */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">YourBrand</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Learning & Growth Platform 🚀
            </p>
          </div>

          {/* Center - Links */}
          <div className="flex flex-wrap justify-center md:justify-start space-x-6">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition">
              About
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition">
              Courses
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition">
              Privacy
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition">
              Contact
            </a>
          </div>

          {/* Right - Social Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 text-xl transition">
              <FaFacebook />
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 text-xl transition">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 text-xl transition">
              <FaLinkedin />
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 text-xl transition">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Bottom Section (No Extra Line Above It) */}
        <div className="w-full mt-6 pt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} YourBrand. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
