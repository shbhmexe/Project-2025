import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme, THEMES } from '../context/ThemeContext'
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  const { theme } = useTheme();
  
  // Get theme-specific background class
  const getFooterBackground = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'bg-dark-darker';
      case THEMES.PURPLE:
        return 'bg-purple-950';
      default:
        return 'bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500';
    }
  };

  // Get theme-specific text colors
  const getTextColors = () => {
    if (theme === THEMES.LIGHT) {
      return {
        primary: 'text-white',
        secondary: 'text-white',
        tertiary: 'text-white/90',
        links: 'text-white/90 hover:text-white',
        border: 'border-white/20'
      };
    } else {
      return {
        primary: 'text-white',
        secondary: 'text-gray-100',
        tertiary: 'text-gray-300',
        links: 'text-gray-300 hover:text-white',
        border: 'border-gray-800'
      };
    }
  };

  const colors = getTextColors();

  const socialLinks = [
    { 
      icon: <FaLinkedin />, 
      link: 'https://www.linkedin.com/in/shubham-shukla-62095032a/', 
      label: 'LinkedIn' 
    },
    { 
      icon: <FaGithub />, 
      link: 'https://github.com/shbhmexe', 
      label: 'GitHub' 
    },
    { 
      icon: <FaInstagram />, 
      link: 'https://www.instagram.com/shbhm.exe', 
      label: 'Instagram' 
    }
  ]

  return (
    <footer className={`${getFooterBackground()} ${colors.primary} pt-16 pb-8`}>
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Communion</h3>
            <p className={colors.tertiary}>
              Connecting people across faiths and interests. Building bridges through events and community support.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-theme-secondary hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${colors.secondary}`}>Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className={`${colors.links} transition-colors inline-flex`}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className={`${colors.links} transition-colors inline-flex`}>
                  Events
                </Link>
              </li>
              <li>
                <Link to="/about" className={`${colors.links} transition-colors inline-flex`}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/community" className={`${colors.links} transition-colors inline-flex`}>
                  Community
                </Link>
              </li>
              <li>
                <Link to="/contact" className={`${colors.links} transition-colors inline-flex`}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${colors.secondary}`}>Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className={`${colors.links} transition-colors inline-flex`}>
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className={`${colors.links} transition-colors inline-flex`}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className={`${colors.links} transition-colors inline-flex`}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className={`${colors.links} transition-colors inline-flex`}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${colors.secondary}`}>Contact Us</h4>
            <ul className={`space-y-3 ${colors.tertiary}`}>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@communion-app.com</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>123 Community St, Faith City</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className={`border-t ${colors.border} pt-8`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/90 text-sm">
              © {new Date().getFullYear()} Communion. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-white/90 text-sm hover:text-white mx-2">Privacy</Link>
              <Link to="/terms-of-service" className="text-white/90 text-sm hover:text-white mx-2">Terms</Link>
              <Link to="/cookies" className="text-white/90 text-sm hover:text-white mx-2">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 