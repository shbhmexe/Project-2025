import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme, THEMES } from '../context/ThemeContext';

const InteractiveMap = ({ location, zoom = 13, height = '400px' }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const { theme } = useTheme();
  
  // Convert location string to coordinates (in a real app, you would use a geocoding service)
  const getCoordinates = (locationString) => {
    // Map of sample locations to coordinates (latitude, longitude)
    const locationMap = {
      'Community Center, Mumbai': [19.0760, 72.8777],
      'Riverside Park, Delhi': [28.7041, 77.1025],
      'MG Road, Bangalore': [12.9716, 77.5946],
      'Jubilee Hills, Hyderabad': [17.4326, 78.4071],
      'Anna University, Chennai': [13.0067, 80.2206],
      // Default to Delhi if location not found
      'default': [28.6139, 77.2090]
    };
    
    return locationMap[locationString] || locationMap['default'];
  };
  
  // Get map style based on theme
  const getMapStyle = () => {
    switch (theme) {
      case THEMES.DARK:
        return 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
      case THEMES.PURPLE:
        // There's no purple map style by default, so we'll use a custom style or fallback to dark
        return 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
      default:
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    }
  };

  useEffect(() => {
    // Load Leaflet map only on client-side
    if (typeof window !== 'undefined' && mapRef.current && !mapInstanceRef.current) {
      // Get coordinates for the location
      const [lat, lng] = getCoordinates(location);
      
      // Initialize map
      const map = L.map(mapRef.current).setView([lat, lng], zoom);
      
      // Add tile layer
      L.tileLayer(getMapStyle(), {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);
      
      // Add marker
      L.marker([lat, lng]).addTo(map)
        .bindPopup(location)
        .openPopup();
      
      // Store map instance for cleanup
      mapInstanceRef.current = map;
    }
    
    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [location, zoom, theme]);
  
  // Update map style when theme changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      // Remove old tile layer
      mapInstanceRef.current.eachLayer(layer => {
        if (layer instanceof L.TileLayer) {
          mapInstanceRef.current.removeLayer(layer);
        }
      });
      
      // Add new tile layer with updated style
      L.tileLayer(getMapStyle(), {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);
    }
  }, [theme]);

  return (
    <div 
      ref={mapRef} 
      style={{ 
        height, 
        width: '100%',
        position: 'relative',
        zIndex: 10 // Lower z-index than header (which is 50)
      }}
      className="rounded-lg overflow-hidden"
    />
  );
};

export default InteractiveMap; 