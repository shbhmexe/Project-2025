import { Link } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useTheme, THEMES } from '../context/ThemeContext'

const Hero = () => {
  const { theme } = useTheme();
  
  // Get theme-specific background class
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

  // Function to open link in new tab
  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Function to handle navigation and open project link
  // eslint-disable-next-line no-unused-vars
  const handleNavigation = () => {
    // Open the project link in a new tab without affecting current navigation
    setTimeout(() => {
      openInNewTab('https://mduiitmlearn.vercel.app/');
    }, 500);
  };

  return (
    <section className={`py-16 ${getHeroBackground()}`}>
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium">
              Connecting Communities Across Faiths
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Building Bridges Through <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Shared Experiences</span>
            </h1>
            <p className="text-theme-secondary">
              Join our vibrant community and discover events that bring people together from all backgrounds and beliefs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/events" 
                className="btn-primary group"
                onClick={handleNavigation}
              >
                Explore Events
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/community" 
                className="btn-outline"
                onClick={handleNavigation}
              >
                Join Community
              </Link>
            </div>
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-theme-tertiary bg-gray-300 overflow-hidden">
                    <img 
                      src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`} 
                      alt="Community member" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm text-theme-secondary">
                <span className="font-bold">500+</span> members have joined
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/20 rounded-full blur-xl"></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-theme-tertiary shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="People connecting" 
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-5 -right-5 bg-gradient-primary p-4 rounded-lg shadow-lg">
                  <div className="text-white text-center">
                    <div className="text-3xl font-bold">25+</div>
                    <div className="text-xs">Events this month</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero 