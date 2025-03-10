import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTheme, THEMES } from '../context/ThemeContext'

const CommunityPage = () => {
  const { theme } = useTheme();
  
  // Get hero background based on theme
  const getHeroBackground = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'bg-gradient-dark';
      case THEMES.PURPLE:
        return 'bg-gradient-to-r from-purple-900 to-purple-800';
      default:
        return 'bg-theme-primary'; // Use theme-primary for light mode to match Events page
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Simplified like Events page */}
      <section className={`py-10 md:py-16 ${getHeroBackground()}`}>
        <div className="container-custom">
          <div className="text-center mb-4 md:mb-12">
            <h1 className="text-4xl font-bold mb-2 md:mb-4">
              Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Community</span>
            </h1>
            <p className="text-theme-secondary max-w-2xl mx-auto">
              A diverse, inclusive space where people from all backgrounds come together to connect, learn, and grow.
            </p>
          </div>
        </div>
      </section>

      {/* Community Benefits - With gradient */}
      <section className="py-16 bg-gradient-to-b from-theme-primary to-theme-tertiary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Why Join Our Community?</h2>
            <p className="text-theme-secondary">
              Being part of the Communion community offers numerous benefits and opportunities for personal and collective growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Connect",
                description: "Build meaningful relationships with people from diverse backgrounds and faiths.",
                icon: "🔄",
              },
              {
                title: "Learn",
                description: "Expand your understanding of different cultures, traditions, and perspectives.",
                icon: "📚",
              },
              {
                title: "Participate",
                description: "Join events, workshops, and discussions that foster dialogue and connection.",
                icon: "🎯",
              },
              {
                title: "Contribute",
                description: "Share your unique experiences and insights to enrich our collective wisdom.",
                icon: "🌟",
              },
            ].map((benefit, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-theme-secondary">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Groups */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Community Groups</h2>
            <p className="text-theme-secondary">
              Join one of our specialized groups based on your interests and connect with others who share your passions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Interfaith Dialogue",
                description: "Engage in respectful conversations about different faith traditions and find common ground.",
                members: 120,
                image: "/images/events/religious.jpg",
              },
              {
                title: "Community Service",
                description: "Volunteer for local initiatives and make a positive impact in your community.",
                members: 85,
                image: "/images/events/charity.jpg",
              },
              {
                title: "Cultural Exchange",
                description: "Share and learn about different cultural traditions, foods, arts, and celebrations.",
                members: 150,
                image: "/images/events/social.jpg",
              },
            ].map((group, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card group overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={group.image} 
                    alt={group.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-bold">{group.title}</h3>
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {group.members} members
                    </span>
                  </div>
                  <p className="text-theme-secondary mb-4">{group.description}</p>
                  <button className="text-primary font-medium hover:text-primary/80 transition-colors flex items-center">
                    Join Group
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - With gradient */}
      <section className="py-16 bg-gradient-to-b from-theme-tertiary to-theme-primary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Community Voices</h2>
            <p className="text-theme-secondary">
              Hear from our members about their experiences being part of the Communion community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Being part of this community has opened my eyes to different perspectives and helped me grow in my own faith journey.",
                name: "David Kim",
                role: "Member since 2019",
                image: "https://randomuser.me/api/portraits/men/22.jpg",
              },
              {
                quote: "I've made lifelong friends through Communion events. The connections I've formed here are truly meaningful and enriching.",
                name: "Sophia Rodriguez",
                role: "Member since 2020",
                image: "https://randomuser.me/api/portraits/women/54.jpg",
              },
              {
                quote: "The interfaith dialogues have deepened my understanding of other traditions while strengthening my own beliefs.",
                name: "James Wilson",
                role: "Member since 2018",
                image: "https://randomuser.me/api/portraits/men/67.jpg",
              },
            ].map((testimonial, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <div className="mb-4">
                  <svg className="w-8 h-8 text-primary/30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-theme-secondary mb-6 italic">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-theme-secondary">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Join Our Community?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-white">
            Become part of a movement that celebrates diversity, fosters understanding, and builds meaningful connections.
          </p>
          <Link to="/contact" className="btn bg-white text-primary hover:bg-gray-100 inline-flex items-center group">
            Join Now
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default CommunityPage 