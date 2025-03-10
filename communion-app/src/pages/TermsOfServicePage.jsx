import React from 'react';
import { useTheme, THEMES } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const TermsOfServicePage = () => {
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
              Terms of Service
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
              <h2 className="text-2xl font-bold mb-6">1. Acceptance of Terms</h2>
              <p className={`${getSecondaryTextColor()} mb-6`}>
                By accessing or using the Communion App website and services, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you may not access or use our services.
              </p>

              <h2 className="text-2xl font-bold mb-6">2. Description of Service</h2>
              <p className={`${getSecondaryTextColor()} mb-6`}>
                Communion App provides a platform for users to connect with communities, discover and create events, and engage with other users. We reserve the right to modify, suspend, or discontinue any aspect of the service at any time.
              </p>

              <h2 className="text-2xl font-bold mb-6">3. User Accounts</h2>
              <p className={`${getSecondaryTextColor()} mb-4`}>
                To access certain features of our service, you may be required to create an account. You are responsible for:
              </p>
              <ul className={`${getSecondaryTextColor()} list-disc pl-6 mb-6 space-y-2`}>
                <li>Maintaining the confidentiality of your account information</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use of your account</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6">4. User Content</h2>
              <p className={`${getSecondaryTextColor()} mb-4`}>
                You retain ownership of any content you submit, post, or display on or through our service. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, and display such content.
              </p>
              <p className={`${getSecondaryTextColor()} mb-6`}>
                You agree not to post content that:
              </p>
              <ul className={`${getSecondaryTextColor()} list-disc pl-6 mb-6 space-y-2`}>
                <li>Is unlawful, harmful, threatening, abusive, harassing, defamatory, or invasive of privacy</li>
                <li>Infringes on intellectual property rights of others</li>
                <li>Contains software viruses or any other code designed to interrupt, destroy, or limit functionality</li>
                <li>Constitutes unauthorized commercial communications</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6">5. Limitation of Liability</h2>
              <p className={`${getSecondaryTextColor()} mb-6`}>
                In no event shall Communion App, its officers, directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of our service.
              </p>

              <h2 className="text-2xl font-bold mb-6">6. Indemnification</h2>
              <p className={`${getSecondaryTextColor()} mb-6`}>
                You agree to indemnify and hold Communion App and its affiliates, officers, agents, and employees harmless from any claim or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your use of the service, your violation of these Terms, or your violation of any rights of another.
              </p>

              <h2 className="text-2xl font-bold mb-6">7. Governing Law</h2>
              <p className={`${getSecondaryTextColor()} mb-6`}>
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
              </p>

              <h2 className="text-2xl font-bold mb-6">8. Changes to Terms</h2>
              <p className={`${getSecondaryTextColor()} mb-6`}>
                We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting the new Terms on our website and updating the "last updated" date. Your continued use of the service after such changes constitutes your acceptance of the new Terms.
              </p>

              <h2 className="text-2xl font-bold mb-6">9. Contact Information</h2>
              <p className={`${getSecondaryTextColor()} mb-6`}>
                If you have any questions about these Terms, please contact us at shubhushukla586@gmail.com.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfServicePage; 