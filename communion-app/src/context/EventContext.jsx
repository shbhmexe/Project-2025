import { createContext, useState, useContext, useEffect } from 'react'
import { initialEvents } from '../data/sampleEvents'

// Create context
const EventContext = createContext()

// Custom hook to use the context
export const useEvents = () => {
  const context = useContext(EventContext)
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider')
  }
  return context
}

// Provider component
export const EventProvider = ({ children }) => {
  // Try to get events from localStorage first
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('communion-events')
    return savedEvents ? JSON.parse(savedEvents) : initialEvents
  })
  
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('communion-events', JSON.stringify(events))
  }, [events])
  
  // Add a new event
  const addEvent = (newEvent) => {
    const event = {
      ...newEvent,
      id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1
    }
    setEvents([...events, event])
  }
  
  // Get event by ID
  const getEventById = (id) => {
    return events.find(event => event.id === id) || null
  }
  
  // Filter events by category
  const getFilteredEvents = () => {
    if (selectedCategory === 'All') {
      return events
    }
    return events.filter(event => event.category === selectedCategory)
  }
  
  const value = {
    events,
    addEvent,
    getEventById,
    selectedCategory,
    setSelectedCategory,
    getFilteredEvents
  }
  
  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  )
}

export default EventContext 