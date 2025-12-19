"use client";
import Head from "next/head";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <>
    
      <Head>
        <title>Privacy Policy - https://www.mduiitmlearn.app</title>
        <meta name="description" content="Privacy Policy of Your Website" />
      </Head>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl mx-auto px-6 py-12 mt-36 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-300 dark:border-gray-700 transition-all duration-300 mb-10"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-8"
        >
          Privacy Policy
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6"
        >
          Welcome to <strong className="text-blue-600 dark:text-blue-400">https://www.mduiitmlearn.app </strong> 
          We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and protect your information.
        </motion.p>

        {[
          { title: "📌 1. Information We Collect", content: ["Personal details such as name, email address, and phone number.", "Technical data like IP address, browser type, and device information.", "Usage data including interactions with our website."] },
          { title: "🔍 2. How We Use Your Information", content: ["Improve and personalize your experience.", "Communicate with you regarding updates or support.", "Ensure security and prevent fraud."] },
          { title: "🍪 3. Cookies", content: ["We use cookies to enhance your experience. You can disable cookies through your browser settings."] },
          { title: "🔐 4. Data Security", content: ["We implement security measures to protect your data, but no method is 100% secure."] },
          { title: "🌍 5. Third-Party Services", content: ["We may use third-party services that collect data in accordance with their own privacy policies."] },
          { title: "⚖️ 6. Your Rights", content: ["You have the right to access, modify, or delete your personal data. Contact us for any requests."] },
          { title: "📄 7. Changes to This Policy", content: ["We may update this policy from time to time. Please review it periodically."] },
        ].map((section, index) => (
          <motion.section
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 + 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{section.title}</h2>
            <ul className="list-disc list-inside mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              {section.content.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </motion.section>
        ))}

        {/* Contact Us Section */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">📩 8. Contact Us</h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            If you have any questions, reach out to us at{" "}
            <a
              href="mailto:support@yourwebsite.com"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline transition-all duration-200 hover:text-blue-700 dark:hover:text-blue-300"
            >
              support@mduiitmlearn.com
            </a>
          </p>
        </motion.section>
      </motion.div>
    </>
  );
}
