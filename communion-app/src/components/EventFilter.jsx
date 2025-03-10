import { useEvents } from '../context/EventContext'
import { categories } from '../data/sampleEvents'

const EventFilter = () => {
  const { selectedCategory, setSelectedCategory } = useEvents()

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category
              ? 'bg-primary text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default EventFilter 