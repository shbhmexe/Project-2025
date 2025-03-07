"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-black min-h-screen flex justify-center items-center py-12 px-6  mt-14">
      <div className="max-w-4xl bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-10 border border-gray-300 dark:border-gray-700 transition-all duration-300">
        
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
            About <span className="text-blue-600 dark:text-blue-400">MDU IITM LEARN</span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-3">
            Enhancing the learning experience for B.Tech students 🚀
          </p>
        </header>

        {/* Who We Are */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center">
            🎓 Who We Are
          </h2>
          <p className="mt-5 text-lg text-gray-700 dark:text-gray-300 text-center leading-relaxed">
            MDU IITM LEARN is a cutting-edge educational platform providing 
            high-quality resources, curated notes, and interactive tools to help students excel in their academic journey.
          </p>
        </section>

        {/* Our Mission */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center">
            🚀 Our Mission
          </h2>
          <p className="mt-5 text-lg text-gray-700 dark:text-gray-300 text-center leading-relaxed">
            Our mission is to create a seamless, accessible, and efficient learning environment 
            where students can find well-structured notes, guides, and additional resources.  
            We bridge the gap between knowledge and accessibility, ensuring every student learns at their own pace.
          </p>
        </section>

        {/* Why Choose Us */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center">
            🌟 Why Choose Us?
          </h2>
          <ul className="mt-6 text-lg text-gray-700 dark:text-gray-300 list-disc list-inside space-y-4">
            <motion.li whileHover={{ scale: 1.05, color: "#2563EB" }} className="font-medium">
              📚 Comprehensive & well-structured learning materials
            </motion.li>
            <motion.li whileHover={{ scale: 1.05, color: "#2563EB" }} className="font-medium">
              🌍 Accessible anytime, anywhere
            </motion.li>
            <motion.li whileHover={{ scale: 1.05, color: "#2563EB" }} className="font-medium">
              🚀 Seamless integration with modern learning methods
            </motion.li>
            <motion.li whileHover={{ scale: 1.05, color: "#2563EB" }} className="font-medium">
              🎨 Student-friendly interface with a responsive design
            </motion.li>
            <motion.li whileHover={{ scale: 1.05, color: "#2563EB" }} className="font-medium">
              🔄 Regular updates to stay ahead of the curriculum
            </motion.li>
          </ul>
        </section>

      </div>
    </div>
  );
}
