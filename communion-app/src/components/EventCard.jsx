import { CalendarIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTheme, THEMES } from '../context/ThemeContext'

const EventCard = ({ event }) => {
  const { theme } = useTheme();
  
  // Get category color class based on event category and theme
  const getCategoryColor = (category) => {
    // Base colors for light theme
    let colorClasses = {
      Religious: 'bg-primary/10 text-primary',
      Charity: 'bg-secondary/10 text-secondary',
      Social: 'bg-accent/10 text-accent',
      default: 'bg-gray-100 text-gray-800'
    };
    
    // Adjust colors for dark theme
    if (theme === THEMES.DARK) {
      colorClasses = {
        Religious: 'bg-primary/20 text-primary-light',
        Charity: 'bg-secondary/20 text-secondary-light',
        Social: 'bg-accent/20 text-accent-light',
        default: 'bg-gray-800 text-gray-200'
      };
    }
    
    // Adjust colors for purple theme
    if (theme === THEMES.PURPLE) {
      colorClasses = {
        Religious: 'bg-purple-300/20 text-purple-300',
        Charity: 'bg-purple-200/20 text-purple-200',
        Social: 'bg-purple-100/20 text-purple-100',
        default: 'bg-purple-800 text-purple-200'
      };
    }
    
    return colorClasses[category] || colorClasses.default;
  };

  // Get card footer background based on theme
  const getCardFooterBg = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'bg-dark-light';
      case THEMES.PURPLE:
        return 'bg-purple-800';
      default:
        return 'bg-gray-50';
    }
  };

  // Get image based on event category
  const getEventImage = (event) => {
    // Map of category to image files
    const categoryImages = {
      Religious: ['/images/events/religious.jpg', '/images/events/religious2.jpg'],
      Charity: ['/images/events/charity.jpg'],
      Social: ['/images/events/social.jpg', '/images/events/social2.jpg'],
      default: ['/images/events/default.jpg']
    };
    
    // If event has a specific image, use it
    if (event.image) {
      return event.image;
    }
    
    // Otherwise select an image based on category and event ID
    const images = categoryImages[event.category] || categoryImages.default;
    const index = (event.id - 1) % images.length;
    return images[index];
  };

  // Get attendee avatar images
  const getAttendeeImage = (eventId, index) => {
    // Since we don't have avatar images yet, use event images as fallback
    const images = [
      '/images/events/religious.jpg',
      '/images/events/charity.jpg',
      '/images/events/social.jpg',
      '/images/events/religious2.jpg',
      '/images/events/social2.jpg'
    ];
    
    const imageIndex = ((eventId * 3 + index) % images.length);
    return images[imageIndex];
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="card group overflow-hidden cursor-pointer"
    >
      <Link to={`/events/${event.id}`} className="block h-full">
        {/* Event Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={getEventImage(event)} 
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
              {event.category}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
            <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded" style={{ backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-secondary)' }}>Event #{event.id}</span>
          </div>
          
          <p className="mb-4 line-clamp-2" style={{ color: 'var(--color-text-primary)' }}>{event.description}</p>
          
          <div className="space-y-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-2" style={{ color: 'var(--color-accent)' }} />
              <span>{new Date(event.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="w-4 h-4 mr-2" style={{ color: 'var(--color-accent)' }} />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center">
              <UserGroupIcon className="w-4 h-4 mr-2" style={{ color: 'var(--color-accent)' }} />
              <span>{event.id * 15 + 30} attending</span>
            </div>
          </div>
        </div>
        
        <div className={`${getCardFooterBg()} px-6 py-3 flex justify-between items-center border-t`} style={{ borderColor: 'var(--color-bg-primary)' }}>
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-6 h-6 rounded-full border border-white bg-gray-200 overflow-hidden">
                <img 
                  src={getAttendeeImage(event.id, i)} 
                  alt="Attendee" 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center font-medium transition-colors" style={{ color: 'var(--color-accent)' }}>
            Learn More
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default EventCard 