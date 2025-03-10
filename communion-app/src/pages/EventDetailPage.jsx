import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CalendarIcon, MapPinIcon, UserGroupIcon, ShareIcon, HeartIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { useTheme, THEMES } from '../context/ThemeContext'
import { useEvents } from '../context/EventContext'
import InteractiveMap from '../components/InteractiveMap'

const EventDetailPage = () => {
  const { id } = useParams()
  const { theme } = useTheme()
  const { getEventById } = useEvents()
  const [event, setEvent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  
  // Get event image based on category
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

  // Get background based on theme
  const getBackground = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'bg-theme-primary';
      case THEMES.PURPLE:
        return 'bg-theme-primary';
      default:
        return 'bg-theme-primary';
    }
  };

  // Get section background based on theme
  const getSectionBackground = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'bg-dark-light';
      case THEMES.PURPLE:
        return 'bg-purple-800';
      default:
        return 'bg-white';
    }
  };

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

  // Get attendee avatar images
  const getAttendeeImage = (eventId, index) => {
    // Use event images as attendee avatars
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

  useEffect(() => {
    if (id) {
      const eventData = getEventById(parseInt(id, 10));
      setEvent(eventData);
      setIsLoading(false);
    }
  }, [id, getEventById]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
        <p className="mb-6">The event you're looking for doesn't exist or has been removed.</p>
        <Link to="/events" className="btn-primary">
          Back to Events
        </Link>
      </div>
    );
  }

  // Calculate attendees based on event ID
  const attendees = event.id * 15 + 30;

  // Map US locations to Indian locations for display
  const getIndianLocation = (location) => {
    const locationMap = {
      'Community Center, New York': 'Community Center, Mumbai',
      'Riverside Park, Chicago': 'Riverside Park, Delhi',
      'Downtown Square, Los Angeles': 'MG Road, Bangalore',
      'Mountain View Center, Colorado': 'Jubilee Hills, Hyderabad',
      'University Hall, Boston': 'Anna University, Chennai'
    };
    
    return locationMap[location] || location;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className={`py-16 ${getBackground()}`}>
        <div className="container-custom">
          {/* Back Button */}
          <Link to="/events" className="inline-flex items-center text-theme-secondary hover:text-theme-primary mb-6 transition-colors">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Events
          </Link>
          
          {/* Event Category Badge */}
          <div className="mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
              {event.category}
            </span>
          </div>
          
          {/* Event Title */}
          <h1 className="text-4xl font-bold mb-4">
            {event.title}
          </h1>
          
          {/* Event Meta */}
          <div className="flex flex-wrap gap-4 mb-6 text-theme-secondary">
            <div className="flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2" />
              <span>{new Date(event.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="w-5 h-5 mr-2" />
              <span>{getIndianLocation(event.location)}</span>
            </div>
            <div className="flex items-center">
              <UserGroupIcon className="w-5 h-5 mr-2" />
              <span>{attendees} attending</span>
            </div>
          </div>
        </div>
      </section>

      {/* Event Content Section */}
      <section className="py-16 bg-gradient-to-b from-theme-primary to-theme-tertiary">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Event Image */}
              <div className="rounded-lg overflow-hidden mb-8 shadow-lg">
                <img 
                  src={getEventImage(event)} 
                  alt={event.title}
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Event Description */}
              <div className={`rounded-lg p-6 mb-8 shadow-lg ${getSectionBackground()}`}>
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                <p className="mb-4">{event.description}</p>
                <p>Join us for this amazing event where you'll have the opportunity to connect with like-minded individuals and make a difference in your community. Whether you're new to the area or a long-time resident, this event offers something for everyone.</p>
                <p className="mt-4">Don't miss out on this chance to be part of something special!</p>
              </div>
              
              {/* Event Schedule */}
              <div className={`rounded-lg p-6 mb-8 shadow-lg ${getSectionBackground()}`}>
                <h2 className="text-2xl font-bold mb-4">Event Schedule</h2>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="w-24 font-medium">9:00 AM</div>
                    <div>
                      <h3 className="font-medium">Registration & Welcome</h3>
                      <p className="text-sm text-theme-secondary">Check-in and receive your event materials</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-24 font-medium">10:00 AM</div>
                    <div>
                      <h3 className="font-medium">Opening Session</h3>
                      <p className="text-sm text-theme-secondary">Introduction and keynote presentation</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-24 font-medium">12:00 PM</div>
                    <div>
                      <h3 className="font-medium">Lunch Break</h3>
                      <p className="text-sm text-theme-secondary">Networking opportunity with refreshments provided</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-24 font-medium">1:30 PM</div>
                    <div>
                      <h3 className="font-medium">Main Activities</h3>
                      <p className="text-sm text-theme-secondary">Group activities and collaborative sessions</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-24 font-medium">4:00 PM</div>
                    <div>
                      <h3 className="font-medium">Closing Remarks</h3>
                      <p className="text-sm text-theme-secondary">Summary and next steps</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Attendee Images */}
              <div className="flex -space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                    <img 
                      src={getAttendeeImage(event.id, i)} 
                      alt={`Attendee ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-theme-primary text-white flex items-center justify-center text-xs">
                  +{attendees - 5}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div>
              {/* Action Card */}
              <div className={`rounded-lg p-6 mb-8 shadow-lg sticky top-24 ${getSectionBackground()}`}>
                <div className="flex justify-between items-center mb-6">
                  <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="flex items-center text-theme-secondary hover:text-primary transition-colors"
                  >
                    {isFavorite ? (
                      <HeartIconSolid className="w-5 h-5 mr-2 text-red-500" />
                    ) : (
                      <HeartIcon className="w-5 h-5 mr-2" />
                    )}
                    {isFavorite ? 'Saved' : 'Save'}
                  </button>
                  <button className="flex items-center text-theme-secondary hover:text-primary transition-colors">
                    <ShareIcon className="w-5 h-5 mr-2" />
                    Share
                  </button>
                </div>
                
                <button className="w-full py-3 px-4 bg-primary text-white rounded-md font-medium hover:bg-primary-dark transition-colors mb-4">
                  Register for Event
                </button>
                
                <p className="text-sm text-center text-theme-secondary mb-6">
                  {attendees} people are attending this event
                </p>
                
                {/* Organizer Info */}
                <div className="border-t pt-6">
                  <h3 className="font-medium mb-3">Organizer</h3>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src={getAttendeeImage(event.id, 0)} 
                        alt="Organizer" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">Community Organizer</h4>
                      <p className="text-sm text-theme-secondary">Event Host</p>
                    </div>
                  </div>
                </div>
                
                {/* Location */}
                <div className="border-t pt-6 mt-6">
                  <h3 className="font-medium mb-3">Location</h3>
                  <p className="mb-3">{getIndianLocation(event.location)}</p>
                  <InteractiveMap 
                    location={getIndianLocation(event.location)} 
                    zoom={13} 
                    height="200px" 
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Similar Events */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar Events You Might Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`rounded-lg overflow-hidden shadow-lg ${getSectionBackground()}`}>
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={getEventImage(event)} 
                      alt="Similar event"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2">Related {event.category} Event</h3>
                    <p className="text-sm text-theme-secondary mb-3">Coming soon</p>
                    <Link to={`/events/${event.id + i}`} className="text-primary font-medium hover:underline">
                      Learn more
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EventDetailPage 