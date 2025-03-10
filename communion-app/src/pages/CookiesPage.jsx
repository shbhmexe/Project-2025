import React from 'react';
import { useTheme, THEMES } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const CookiesPage = () => {
  const { theme } = useTheme();

  const getHeroBackground = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'bg-dark-primary';
      case THEMES.PURPLE:
        return 'bg-purple-900';
      default:
        return 'bg-theme-primary';
    }
  };

  const getHeroTextColor = () => {
    switch (theme) {
      case THEMES.DARK:
      case THEMES.PURPLE:
        return 'text-white';
      default:
        return 'text-gray-900';
    }
  };

  const getContentBackground = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'bg-dark-light';
      case THEMES.PURPLE:
        return 'bg-purple-800';
      default:
        return 'bg-white shadow-lg';
    }
  };

  const getTextColor = () => {
    switch (theme) {
      case THEMES.DARK:
      case THEMES.PURPLE:
        return 'text-white';
      default:
        return 'text-gray-800';
    }
  };

  const getSecondaryTextColor = () => {
    switch (theme) {
      case THEMES.DARK:
      case THEMES.PURPLE:
        return 'text-gray-300';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className={`${getHeroBackground()} py-10 md:py-16`}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className={`text-4xl md:text-5xl font-bold ${getHeroTextColor()} mb-2 md:mb-4`}>
              Cookie Policy
            </h1>
            <p className={`text-xl ${getHeroTextColor()} opacity-90 max-w-2xl mx-auto`}>
              Last updated: May 20, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-gradient-to-b from-theme-primary to-theme-tertiary py-10 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className={`${getContentBackground()} rounded-lg shadow-lg p-8 max-w-4xl mx-auto`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={`${getTextColor()}`}>
              <h2 className="text-2xl font-bold mb-6">What Are Cookies</h2>
              <p className={`${getSecondaryTextColor()} mb-6`}>
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
              </p>

              <h2 className="text-2xl font-bold mb-6">How We Use Cookies</h2>
              <p className={`${getSecondaryTextColor()} mb-4`}>
                We use cookies for several purposes, including:
              </p>
              <ul className={`${getSecondaryTextColor()} list-disc pl-6 mb-6 space-y-2`}>
                <li>To enable certain functions of the website</li>
                <li>To provide analytics</li>
                <li>To store your preferences</li>
                <li>To enable advertisements delivery, including behavioral advertising</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6">Types of Cookies We Use</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Essential Cookies</h3>
                  <p className={`${getSecondaryTextColor()}`}>
                    These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. You may disable these by changing your browser settings, but this may affect how the website functions.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Analytics Cookies</h3>
                  <p className={`${getSecondaryTextColor()}`}>
                    These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and your experience.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Functional Cookies</h3>
                  <p className={`${getSecondaryTextColor()}`}>
                    These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Targeting Cookies</h3>
                  <p className={`${getSecondaryTextColor()}`}>
                    These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold my-6">Managing Cookies</h2>
              <p className={`${getSecondaryTextColor()} mb-4`}>
                Most web browsers allow you to control cookies through their settings. You can:
              </p>
              <ul className={`${getSecondaryTextColor()} list-disc pl-6 mb-6 space-y-2`}>
                <li>Delete cookies from your browser</li>
                <li>Block cookies by activating the setting on your browser that allows you to refuse all or some cookies</li>
                <li>Set your browser to notify you when you receive a cookie</li>
              </ul>
              <p className={`${getSecondaryTextColor()} mb-6`}>
                Please note that if you choose to block or delete cookies, you may not be able to access certain areas or features of our website, and some services may not function properly.
              </p>

              <h2 className="text-2xl font-bold mb-6">Changes to Our Cookie Policy</h2>
              <p className={`${getSecondaryTextColor()} mb-6`}>
                We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "last updated" date.
              </p>

              <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
              <p className={`${getSecondaryTextColor()} mb-6`}>
                If you have any questions about our Cookie Policy, please contact us at shubhushukla586@gmail.com.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CookiesPage; 