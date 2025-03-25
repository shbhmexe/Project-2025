import axios from 'axios';

// Use a free API key from OpenWeather
const API_KEY = 'b5a662b6272f231a4c82c57b728f1d12'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByLocation = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};