import React from 'react';
import { useTheme, THEMES } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const PrivacyPolicyPage = () => {
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
            <motion.h1 
              className={`text-4xl md:text-5xl font-bold ${getHeroTextColor()} mb-2 md:mb-4`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Privacy Policy
            </motion.h1>
            <motion.p 
              className={`text-xl ${getHeroTextColor()} opacity-90 max-w-2xl mx-auto`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Last updated: May 20, 2024
            </motion.p>
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
              <h2 className="text-2xl font-bold mb-6">Introduction</h2>
              <p className={`${getSecondaryTextColor()} mb-6`}>
                At Communion App, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.
              </p>

              <h2 className="text-2xl font-bold mb-6">Information We Collect</h2>
              <p className={`${getSecondaryTextColor()} mb-4`}>
                We collect several types of information from and about users of our website, including:
              </p>
              <ul className={`${getSecondaryTextColor()} list-disc pl-6 mb-6 space-y-2`}>
                <li>Personal information such as name, email address, and profile information</li>
                <li>Information about your device and internet connection</li>
                <li>Usage data about how you interact with our website</li>
                <li>Location data if you choose to share it</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6">How We Use Your Information</h2>
              <p className={`${getSecondaryTextColor()} mb-4`}>
                We use the information we collect for various purposes, including:
              </p>
              <ul className={`${getSecondaryTextColor()} list-disc pl-6 mb-6 space-y-2`}>
                <li>To provide and maintain our service</li>
                <li>To notify you about changes to our service</li>
                <li>To allow you to participate in interactive features</li>
                <li>To provide customer support</li>
                <li>To gather analysis to improve our service</li>
                <li>To monitor the usage of our service</li>
                <li>To detect, prevent, and address technical issues</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6">Data Security</h2>
              <p className={`${getSecondaryTextColor()} mb-6`}>
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl font-bold mb-6">Third-Party Services</h2>
              <p className={`${getSecondaryTextColor()} mb-6`}>
                Our service may contain links to third-party websites or services that are not owned or controlled by Communion App. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
              </p>

              <h2 className="text-2xl font-bold mb-6">Children's Privacy</h2>
              <p className={`${getSecondaryTextColor()} mb-6`}>
                Our service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers.
              </p>

              <h2 className="text-2xl font-bold mb-6">Changes to This Privacy Policy</h2>
              <p className={`${getSecondaryTextColor()} mb-6`}>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "last updated" date at the top of this Privacy Policy.
              </p>

              <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
              <p className={`${getSecondaryTextColor()} mb-6`}>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className={`${getSecondaryTextColor()} list-disc pl-6 mb-6 space-y-2`}>
                <li>By email: shubhushukla586@gmail.com</li>
                <li>By visiting the Contact page on our website</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage; 