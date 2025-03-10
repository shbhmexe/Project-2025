import React from 'react'
import { motion } from 'framer-motion'
import { useTheme, THEMES } from '../context/ThemeContext'
import InteractiveMap from '../components/InteractiveMap'
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

const ContactPage = () => {
  const { theme } = useTheme();
  
  // Get hero background based on theme
  const getHeroBackground = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'bg-gradient-dark';
      case THEMES.PURPLE:
        return 'bg-gradient-to-r from-purple-900 to-purple-800';
      default:
        return 'bg-theme-primary'; // Use theme-primary for light mode to match Events page
    }
  };

  // Get section background based on theme
  const getSectionBackground = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'bg-gradient-to-b from-dark-light to-dark-darker';
      case THEMES.PURPLE:
        return 'bg-gradient-to-b from-purple-800 to-purple-900';
      default:
        return 'bg-gradient-to-b from-theme-primary to-theme-tertiary';
    }
  };

  // Get card background based on theme
  const getCardBackground = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'bg-dark-light text-white';
      case THEMES.PURPLE:
        return 'bg-purple-800 text-white';
      default:
        return 'bg-white text-gray-800';
    }
  };

  // Get text color based on theme
  const getTextColor = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'text-gray-300';
      case THEMES.PURPLE:
        return 'text-purple-100';
      default:
        return 'text-gray-600';
    }
  };

  // Get input background based on theme
  const getInputBackground = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'bg-dark-primary border-gray-700 text-white focus:ring-blue-500';
      case THEMES.PURPLE:
        return 'bg-purple-900 border-purple-700 text-white focus:ring-purple-400';
      default:
        return 'bg-white border-gray-300 text-gray-900 focus:ring-primary';
    }
  };

  // Get button style based on theme
  const getButtonStyle = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case THEMES.PURPLE:
        return 'bg-purple-600 hover:bg-purple-700 text-white';
      default:
        return 'bg-primary hover:bg-primary-dark text-white';
    }
  };

  // Get Indian location for the community center
  const getIndianLocation = () => {
    return 'Community Center, Mumbai';
  };

  const socialLinks = [
    { 
      icon: <FaLinkedin className="text-2xl" />, 
      link: 'https://www.linkedin.com/in/shubham-shukla-62095032a/', 
      label: 'LinkedIn',
      text: 'Connect on LinkedIn' 
    },
    { 
      icon: <FaGithub className="text-2xl" />, 
      link: 'https://github.com/shbhmexe', 
      label: 'GitHub',
      text: 'Follow on GitHub' 
    },
    { 
      icon: <FaInstagram className="text-2xl" />, 
      link: 'https://www.instagram.com/shbhm.exe', 
      label: 'Instagram',
      text: 'Follow on Instagram' 
    },
    {
      icon: <FaEnvelope className="text-2xl" />,
      link: 'mailto:shubhushukla586@gmail.com',
      label: 'Email',
      text: 'shubhushukla586@gmail.com'
    },
    {
      icon: <FaPhone className="text-2xl" />,
      link: 'tel:+919876543210',
      label: 'Phone',
      text: '+91 9876543210'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Simplified like Events page */}
      <section className={`py-10 md:py-16 ${getHeroBackground()}`}>
        <div className="container-custom">
          <div className="text-center mb-4 md:mb-12">
            <h1 className="text-4xl font-bold mb-2 md:mb-4">
              Get in <span className={theme === THEMES.PURPLE ? "text-purple-200" : "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"}>Touch</span>
            </h1>
            <p className={`max-w-2xl mx-auto ${theme === THEMES.PURPLE ? "text-purple-100" : "text-theme-secondary"}`}>
              Have questions or want to get involved? We'd love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className={`py-10 md:py-16 ${getSectionBackground()}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div className={`rounded-lg shadow-lg p-6 md:p-8 ${getCardBackground()}`}>
              <h2 className="text-3xl font-bold mb-4 md:mb-6">Get In Touch</h2>
              <form className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={`block text-sm font-medium mb-1 ${getTextColor()}`}>Name</label>
                    <input
                      type="text"
                      id="name"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${getInputBackground()}`}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium mb-1 ${getTextColor()}`}>Email</label>
                    <input
                      type="email"
                      id="email"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${getInputBackground()}`}
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className={`block text-sm font-medium mb-1 ${getTextColor()}`}>Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${getInputBackground()}`}
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className={`block text-sm font-medium mb-1 ${getTextColor()}`}>Message</label>
                  <textarea
                    id="message"
                    rows="5"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${getInputBackground()}`}
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className={`w-full font-medium py-3 px-6 rounded-lg transition-colors ${getButtonStyle()}`}
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Connect With Us */}
            <div>
              <h2 className="text-3xl font-bold mb-4 md:mb-6">Connect With Us</h2>
              <div className={`rounded-lg shadow-lg p-6 md:p-8 mb-4 md:mb-8 ${getCardBackground()}`}>
                <h3 className="text-xl font-semibold mb-3 md:mb-4">Contact Information</h3>
                <ul className="space-y-4">
                  {socialLinks.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`flex items-center hover:opacity-80 transition-opacity ${theme === THEMES.PURPLE ? "text-purple-200" : "text-gray-800 dark:text-gray-300 hover:text-primary dark:hover:text-primary"}`}
                      >
                        <span className={`mr-3 ${theme === THEMES.PURPLE ? "text-purple-300" : "text-primary"}`}>{link.icon}</span>
                        <span>{link.text}</span>
                      </a>
                    </li>
                  ))}
                  <li className={`flex items-center ${theme === THEMES.PURPLE ? "text-purple-200" : "text-gray-800 dark:text-gray-300"}`}>
                    <span className={`mr-3 ${theme === THEMES.PURPLE ? "text-purple-300" : "text-primary"}`}><FaMapMarkerAlt className="text-2xl" /></span>
                    <span>123 Community St, Mumbai, India</span>
                  </li>
                </ul>
              </div>

              <div className={`rounded-lg shadow-lg p-6 md:p-8 ${getCardBackground()}`}>
                <h3 className="text-xl font-semibold mb-3 md:mb-4">Business Hours</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - With gradient */}
      <section className={`py-10 md:py-16 ${getSectionBackground()}`}>
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-6 md:mb-12">
            <h2 className="text-3xl font-bold mb-4 md:mb-6">Visit Our Community Center</h2>
            <p className={theme === THEMES.PURPLE ? "text-purple-100" : "text-theme-secondary"}>
              We're located in the heart of the city, easily accessible by public transportation.
            </p>
          </div>
          
          <div className="card overflow-hidden">
            <InteractiveMap 
              location={getIndianLocation()} 
              zoom={14} 
              height="400px" 
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage 