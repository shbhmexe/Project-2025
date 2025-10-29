import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TopSearchesBanner.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const TopSearchesBanner = () => {
  const [topSearches, setTopSearches] = useState([]);

  useEffect(() => {
    fetchTopSearches();
    const interval = setInterval(fetchTopSearches, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchTopSearches = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/top-searches`);
      setTopSearches(response.data);
    } catch (error) {
      console.error('Error fetching top searches:', error);
    }
  };

  if (topSearches.length === 0) {
    return null;
  }

  return (
    <div className="top-searches-banner">
      <div className="banner-content">
        <span className="banner-label">🔥 Top Searches:</span>
        <div className="search-tags">
          {topSearches.map((search, index) => (
            <span key={index} className="search-tag">
              {search.term} <span className="search-count">({search.count})</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSearchesBanner;
