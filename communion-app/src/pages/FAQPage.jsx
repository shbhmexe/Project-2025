import React, { useState } from 'react';
import { useTheme, THEMES } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQPage = () => {
  const { theme } = useTheme();
  const [openIndex, setOpenIndex] = useState(null);

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

  const getFAQBackground = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'from-dark-primary to-dark-secondary';
      case THEMES.PURPLE:
        return 'from-purple-900 to-purple-700';
      default:
        return 'from-theme-primary to-theme-tertiary';
    }
  };

  const getAccordionBackground = () => {
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

  const getQuestionColor = () => {
    switch (theme) {
      case THEMES.DARK:
      case THEMES.PURPLE:
        return 'text-white';
      default:
        return 'text-gray-800';
    }
  };

  const faqItems = [
    {
      question: 'What is Communion App?',
      answer: 'Communion App is a community-driven platform designed to connect people through events, shared interests, and meaningful interactions. Our goal is to foster a sense of belonging and community in an increasingly digital world.'
    },
    {
      question: 'How do I create an account?',
      answer: 'Creating an account is simple! Click on the "Sign Up" button in the top right corner of the homepage. You\'ll need to provide your name, email address, and create a password. You can also sign up using your Google or Facebook account for quicker access.'
    },
    {
      question: 'Is Communion App free to use?',
      answer: 'Yes, Communion App is completely free for basic usage. We offer premium features for event organizers and community leaders that require a subscription, but individual users can access all core features at no cost.'
    },
    {
      question: 'How do I create an event?',
      answer: 'To create an event, navigate to the Events page and click the "Add Event" button. Fill in the details including title, date, location, category, and description. You can also add an image to make your event more appealing. Once submitted, your event will be visible to the community.'
    },
    {
      question: 'Can I join multiple communities?',
      answer: 'Absolutely! You can join as many communities as you like. Browse the Communities page to discover groups that align with your interests, and click "Join" to become a member. You\'ll receive updates and event notifications from all communities you join.'
    },
    {
      question: 'How do I change my profile information?',
      answer: 'To update your profile, click on your profile picture in the top right corner and select "Profile Settings." From there, you can edit your personal information, change your profile picture, update your password, and manage your notification preferences.'
    },
    {
      question: 'Is my personal information secure?',
      answer: 'We take data security very seriously. All personal information is encrypted and stored securely. We never share your data with third parties without your explicit consent. For more details, please review our Privacy Policy.'
    },
    {
      question: 'How can I contact support?',
      answer: 'If you need assistance, you can reach our support team through the Contact page. Fill out the form with your inquiry, and we\'ll respond within 24 hours. For urgent matters, you can also email us directly at support@communion-app.com.'
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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
              Frequently Asked Questions
            </motion.h1>
            <motion.p 
              className={`text-xl ${getHeroTextColor()} opacity-90 max-w-2xl mx-auto`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Find answers to common questions about Communion App
            </motion.p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`bg-gradient-to-b ${getFAQBackground()} py-10 md:py-16`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
              <motion.div 
                key={index}
                className={`${getAccordionBackground()} rounded-lg mb-4 overflow-hidden shadow-md`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <button
                  className={`w-full px-6 py-4 text-left flex justify-between items-center ${getQuestionColor()} font-medium bg-opacity-10 hover:bg-opacity-20 transition-colors`}
                  onClick={() => toggleAccordion(index)}
                >
                  <span className={`${getQuestionColor()}`}>{item.question}</span>
                  {openIndex === index ? 
                    <FaChevronUp className={getTextColor()} /> : 
                    <FaChevronDown className={getTextColor()} />
                  }
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className={`px-6 py-4 border-t ${theme === THEMES.LIGHT ? 'border-gray-200' : 'border-gray-700'} ${getSecondaryTextColor()}`}>
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="mb-6 max-w-2xl mx-auto">If you couldn't find the answer to your question, feel free to reach out to our support team. We're here to help!</p>
          <a 
            href="/contact" 
            className="inline-block bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default FAQPage; 