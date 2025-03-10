import React, { useState } from 'react';
import { useEvents } from '../context/EventContext';
import EventCard from '../components/EventCard';
import EventFilter from '../components/EventFilter';
import EventForm from '../components/EventForm';
import { motion } from 'framer-motion';

function EventsPage() {
  const { getFilteredEvents } = useEvents();
  const filteredEvents = getFilteredEvents();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Upcoming Events</h1>
          <button 
            onClick={() => setShowForm(!showForm)} 
            className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {showForm ? 'Cancel' : 'Add Event'}
          </button>
        </div>
        
        {showForm && <EventForm onClose={() => setShowForm(false)} />}
        
        <EventFilter />
        
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">No events found matching your criteria.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default EventsPage; 