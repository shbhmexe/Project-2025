import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen section flex items-center justify-center py-20">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-9xl font-bold mb-6" style={{ color: 'var(--color-accent)' }}>404</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Page Not Found</h1>
            <p className="text-theme-secondary mb-8">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link 
              to="/" 
              className="btn-primary inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage 