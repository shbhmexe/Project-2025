# Adding Interactive Maps to Communion App

This guide explains how to implement interactive maps in your Communion application using Leaflet.

## Installation

To add interactive maps to your project, you need to install Leaflet:

```bash
npm install leaflet
```

## Usage

### 1. Import the InteractiveMap Component

First, import the InteractiveMap component where you want to use it:

```jsx
import InteractiveMap from '../components/InteractiveMap';
```

### 2. Use the Component

Replace the static map image with the InteractiveMap component:

```jsx

<div className="rounded-lg overflow-hidden h-40 bg-gray-200">
  <img 
    src={getMapImage(event.location)}
    alt="Event location map"
    className="w-full h-full object-cover"
  />
</div>


<div className="rounded-lg overflow-hidden">
  <InteractiveMap 
    location={getIndianLocation(event.location)} 
    zoom={13} 
    height="300px" 
  />
</div>
```

### 3. Update EventDetailPage.jsx

To implement the interactive map in the event detail page, update the location section:

```jsx
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
```

## Features

The InteractiveMap component includes:

1. **Theme-aware styling**: Maps automatically adjust to light, dark, or purple themes
2. **Interactive controls**: Users can zoom, pan, and click on markers
3. **Location markers**: Automatically places a marker at the event location
4. **Responsive design**: Works on all screen sizes
5. **Indian locations**: Pre-configured with coordinates for major Indian cities

## Customization

You can customize the map by passing these props:

- `location`: The location name (string)
- `zoom`: Zoom level (number, default: 13)
- `height`: Map height (string, default: '400px')

## Adding More Locations

To add more locations, update the `getCoordinates` function in the InteractiveMap component:

```jsx
const getCoordinates = (locationString) => {
  const locationMap = {
    // Existing locations
    'Community Center, Mumbai': [19.0760, 72.8777],
    'Riverside Park, Delhi': [28.7041, 77.1025],
    
    // Add your new locations here
    'Your New Location, City': [latitude, longitude],
  };
  
  return locationMap[locationString] || locationMap['default'];
};
```

## Troubleshooting

If you encounter issues with the map:

1. Make sure Leaflet is properly installed
2. Check that you've imported the CSS: `import 'leaflet/dist/leaflet.css'`
3. Verify that the location string matches one of the predefined locations
4. For custom locations, add them to the `getCoordinates` function

## Advanced Usage

For more advanced features like custom markers, polylines, or geolocation, refer to the [Leaflet documentation](https://leafletjs.com/reference.html). 