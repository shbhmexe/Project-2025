import { useState } from 'react'
import { useEvents } from '../context/EventContext'
import { categories } from '../data/sampleEvents'
import { useTheme, THEMES } from '../context/ThemeContext'

const EventForm = ({ onClose }) => {
  const { theme } = useTheme();
  const { addEvent } = useEvents()
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    category: 'Social',
  })
  
  // Get form background based on theme
  const getFormBackground = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'bg-dark-light text-white border-gray-700';
      case THEMES.PURPLE:
        return 'bg-purple-800 text-white border-purple-700';
      default:
        return 'bg-gradient-to-b from-gray-50 to-white text-dark border-gray-200';
    }
  };
  
  // Get input background based on theme
  const getInputBackground = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'bg-dark-darker text-white border-gray-700 placeholder-gray-400';
      case THEMES.PURPLE:
        return 'bg-purple-900 text-white border-purple-700 placeholder-purple-300';
      default:
        return 'bg-gradient-to-r from-blue-50 to-indigo-250 text-dark border-gray-300 placeholder-gray-600';
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    addEvent(formData)
    onClose()
  }
  
  return (
    <div
      className={`p-6 rounded-lg shadow-lg mb-8 border ${getFormBackground()}`}
    >
      <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="title" className="form-label">Event Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter event title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${getInputBackground()}`}
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="form-label">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              placeholder="Select date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${getInputBackground()}`}
              required
            />
          </div>
          <div>
            <label htmlFor="location" className="form-label">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Enter location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${getInputBackground()}`}
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="form-label">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${getInputBackground()}`}
              required
            >
              {categories.filter(cat => cat !== 'All').map(category => (
                <option key={category} value={category} className={theme !== THEMES.LIGHT ? "bg-dark-darker text-white" : ""}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter event description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px] ${getInputBackground()}`}
            required
          ></textarea>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="btn-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            Add Event
          </button>
        </div>
      </form>
    </div>
  )
}

export default EventForm 