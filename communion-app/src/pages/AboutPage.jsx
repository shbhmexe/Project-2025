import React from 'react'
// We're using motion in the JSX, so we need to keep this import
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useTheme, THEMES } from '../context/ThemeContext'

const AboutPage = () => {
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

  // Get section background based on theme
  const getSectionBackground = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'bg-gradient-to-b from-dark-light to-dark-darker';
      case THEMES.PURPLE:
        return 'bg-gradient-to-b from-purple-800 to-purple-900';
      default:
        return 'bg-gradient-to-b from-theme-primary to-theme-tertiary';
    }
  };

  // Get card background based on theme
  const getCardBackground = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'bg-dark-light text-white';
      case THEMES.PURPLE:
        return 'bg-purple-800 text-white';
      default:
        return 'bg-white text-gray-800';
    }
  };

  // Get text color based on theme
  const getTextColor = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'text-gray-300';
      case THEMES.PURPLE:
        return 'text-purple-100';
      default:
        return 'text-gray-600';
    }
  };

  // Get link color based on theme
  const getLinkColor = (type) => {
    if (type === 'linkedin') {
      switch (theme) {
        case THEMES.DARK:
          return 'text-blue-400 hover:text-blue-300';
        case THEMES.PURPLE:
          return 'text-purple-300 hover:text-purple-200';
        default:
          return 'text-primary hover:text-primary-dark';
      }
    } else { // project
      switch (theme) {
        case THEMES.DARK:
          return 'text-green-400 hover:text-green-300';
        case THEMES.PURPLE:
          return 'text-purple-200 hover:text-purple-100';
        default:
          return 'text-secondary hover:text-secondary-dark';
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Simplified like Events page */}
      <section className={`py-10 md:py-16 ${getHeroBackground()}`}>
        <div className="container-custom">
          <div className="text-center mb-4 md:mb-12">
            <h1 className="text-4xl font-bold mb-2 md:mb-4">
              About <span className={theme === THEMES.PURPLE ? "text-purple-200" : "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"}>Communion</span>
            </h1>
            <p className={`max-w-2xl mx-auto ${theme === THEMES.PURPLE ? "text-purple-100" : "text-theme-secondary"}`}>
              Bridging communities, fostering understanding, and creating meaningful connections.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section - With gradient */}
      <section className={`py-10 md:py-16 ${getSectionBackground()}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div 
              className={`rounded-lg shadow-lg p-6 md:p-8 ${getCardBackground()}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className={`mb-4 ${getTextColor()}`}>
                At Communion, we believe in the power of connection. Our mission is to create a platform that brings people together, transcending barriers of faith, culture, and background.
              </p>
              <p className={getTextColor()}>
                We aim to foster understanding, promote dialogue, and build a more inclusive community where everyone feels valued and heard.
              </p>
            </motion.div>
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="/images/events/default.jpg" 
                alt="Our Mission" 
                className="w-full max-w-md rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Core Values</h2>
            <p className={theme === THEMES.PURPLE ? "text-purple-100" : "text-theme-secondary"}>
              These principles guide everything we do at Communion, from the events we organize to the way we engage with our community members.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Inclusivity",
                description: "We welcome people of all faiths, backgrounds, and identities, creating spaces where everyone feels valued and respected.",
                icon: "🤝",
              },
              {
                title: "Understanding",
                description: "We promote dialogue and learning to foster deeper understanding between different communities and perspectives.",
                icon: "💡",
              },
              {
                title: "Connection",
                description: "We believe in the power of human connection to transform lives and build stronger communities.",
                icon: "🌐",
              },
              {
                title: "Respect",
                description: "We honor the diversity of beliefs and traditions, approaching differences with curiosity and respect.",
                icon: "🙏",
              },
              {
                title: "Service",
                description: "We are committed to serving our communities through volunteer work and charitable initiatives.",
                icon: "❤️",
              },
              {
                title: "Growth",
                description: "We encourage personal and collective growth through continuous learning and self-reflection.",
                icon: "🌱",
              },
            ].map((value, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-theme-secondary">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - With gradient */}
      <section className={`py-10 md:py-16 ${getSectionBackground()}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl font-bold mb-4 md:mb-6">Meet Our Team</h2>
            <p className={theme === THEMES.PURPLE ? "text-purple-100 max-w-2xl mx-auto" : "text-theme-secondary max-w-2xl mx-auto"}>
              A diverse group of passionate individuals dedicated to building bridges and creating meaningful connections.
            </p>
          </div>
          <div className="grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 flex justify-center">
            {[
              {
                name: "Shubham Shukla",
                role: "Founder",
                bio: "Shubham Shukla has been building interfaith communities for over 15 years and founded Communion to create more inclusive spaces.",
                image: "https://media.licdn.com/dms/image/v2/D4D03AQF2CQIIbq8rMQ/profile-displayphoto-shrink_800_800/B4DZUPwnyBGcAc-/0/1739726159517?e=1747267200&v=beta&t=xxI6Uwao-UPAiXdIiY2Af_37QBIT0G4U68i83xDwFr8",
                linkedin: "https://www.linkedin.com/in/shubham-shukla-b0b1b1b1/",
                project: "https://mduiitmlearn.vercel.app/"
              },
            ].map((member, index) => (
              <motion.div 
                key={index}
                className={`rounded-lg shadow-lg p-4 md:p-6 text-center ${getCardBackground()}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className={`text-sm mb-3 ${getTextColor()}`}>{member.role}</p>
                <p className={`text-sm mb-4 ${getTextColor()}`}>{member.bio}</p>
                <div className="flex justify-center space-x-4">
                  {member.linkedin && (
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`inline-flex items-center ${getLinkColor('linkedin')}`}
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(member.linkedin, '_blank');
                      }}
                    >
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      LinkedIn
                    </a>
                  )}
                  {member.project && (
                    <a 
                      href={member.project} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`inline-flex items-center ${getLinkColor('project')}`}
                      onClick={(e) => {
                        e.preventDefault();
                        window.open("https://mduiitmlearn.vercel.app/", '_blank');
                      }}
                    >
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      Project
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage 