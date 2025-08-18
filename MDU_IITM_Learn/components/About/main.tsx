"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="bg-background text-foreground min-h-screen flex justify-center items-center py-12 px-6 mt-14">
      <div className="max-w-4xl card shadow-2xl rounded-2xl p-10 transition-all duration-300">
        
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-foreground">
            About <span className="text-primary">MDU IITM LEARN</span>
          </h1>
          <p className="text-lg text-muted-foreground mt-3">
            Enhancing the learning experience for B.Tech students 🚀
          </p>
        </header>

        {/* Who We Are */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground text-center">
            🎓 Who We Are
          </h2>
          <p className="mt-5 text-lg text-muted-foreground text-center leading-relaxed">
            MDU IITM LEARN is a cutting-edge educational platform providing 
            high-quality resources, curated notes, and interactive tools to help students excel in their academic journey.
          </p>
        </section>

        {/* Our Mission */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground text-center">
            🚀 Our Mission
          </h2>
          <p className="mt-5 text-lg text-muted-foreground text-center leading-relaxed">
            Our mission is to create a seamless, accessible, and efficient learning environment 
            where students can find well-structured notes, guides, and additional resources.  
            We bridge the gap between knowledge and accessibility, ensuring every student learns at their own pace.
          </p>
        </section>

        {/* Why Choose Us */}
        <section>
          <h2 className="text-3xl font-bold text-foreground text-center">
            🌟 Why Choose Us?
          </h2>
          <ul className="mt-6 text-lg text-muted-foreground list-disc list-inside space-y-4">
            <motion.li whileHover={{ scale: 1.03, color: "hsl(var(--primary))" }} className="font-medium">
              📚 Comprehensive & well-structured learning materials
            </motion.li>
            <motion.li whileHover={{ scale: 1.03, color: "hsl(var(--primary))" }} className="font-medium">
              🌍 Accessible anytime, anywhere
            </motion.li>
            <motion.li whileHover={{ scale: 1.03, color: "hsl(var(--primary))" }} className="font-medium">
              🚀 Seamless integration with modern learning methods
            </motion.li>
            <motion.li whileHover={{ scale: 1.03, color: "hsl(var(--primary))" }} className="font-medium">
              🎨 Student-friendly interface with a responsive design
            </motion.li>
            <motion.li whileHover={{ scale: 1.03, color: "hsl(var(--primary))" }} className="font-medium">
              🔄 Regular updates to stay ahead of the curriculum
            </motion.li>
          </ul>
        </section>

      </div>
    </div>
  );
}
