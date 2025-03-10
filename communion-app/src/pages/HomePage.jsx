import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Welcome Message - With gradient */}
      <section className="py-16 bg-gradient-to-b from-theme-primary to-theme-tertiary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Welcome to the Communion App
            </h2>
            <p className="text-theme-secondary">
              Our mission is to connect people of all faiths through meaningful events and community support. 
              We believe that by bringing people together, we can foster understanding, respect, and friendship 
              across different beliefs and backgrounds.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Community Events",
                description: "Discover events that bring people together from different backgrounds and beliefs.",
                icon: "🎉",
                delay: 0,
              },
              {
                title: "Interfaith Dialogue",
                description: "Participate in meaningful conversations that promote understanding and respect.",
                icon: "💬",
                delay: 100,
              },
              {
                title: "Support Network",
                description: "Connect with a supportive community that celebrates diversity and inclusion.",
                icon: "🤝",
                delay: 200,
              },
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="card p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-theme-secondary">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - With gradient */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Join Our Community?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-100">
            Explore upcoming events and connect with people who share your interests.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/events" className="btn bg-white text-secondary hover:bg-gray-100 inline-flex items-center group">
              Explore Events
              <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage 