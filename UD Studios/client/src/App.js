import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Login from './components/Login';
import TopSearchesBanner from './components/TopSearchesBanner';
import SearchBar from './components/SearchBar';
import ImageGrid from './components/ImageGrid';
import SearchHistory from './components/SearchHistory';
import Header from './components/Header';

axios.defaults.withCredentials = true;

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [resultCount, setResultCount] = useState(0);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/user`);
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (term) => {
    try {
      const response = await axios.post(`${API_URL}/api/search`, { term });
      setSearchResults(response.data.results);
      setSearchTerm(response.data.term);
      setResultCount(response.data.count);
      setSelectedImages([]);
    } catch (error) {
      console.error('Search error:', error);
      alert(error.response?.data?.error || 'Failed to search images');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${API_URL}/auth/logout`);
      setUser(null);
      setSearchResults([]);
      setSearchTerm('');
      setSelectedImages([]);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleImageSelection = (imageId) => {
    setSelectedImages((prev) =>
      prev.includes(imageId)
        ? prev.filter((id) => id !== imageId)
        : [...prev, imageId]
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="App">
      <Header user={user} onLogout={handleLogout} />
      <TopSearchesBanner />
      
      <div className="main-content">
        <div className="search-section">
          <SearchBar onSearch={handleSearch} />
          
          {searchTerm && (
            <div className="search-info">
              <p className="search-result-text">
                You searched for <strong>"{searchTerm}"</strong> -- {resultCount} results.
              </p>
              {selectedImages.length > 0 && (
                <p className="selected-counter">
                  Selected: {selectedImages.length} images
                </p>
              )}
            </div>
          )}

          {searchResults.length > 0 && (
            <ImageGrid
              images={searchResults}
              selectedImages={selectedImages}
              onToggleSelection={toggleImageSelection}
            />
          )}

          {searchTerm && searchResults.length === 0 && (
            <div className="no-results">
              <p>No images found for "{searchTerm}"</p>
            </div>
          )}
        </div>

        <SearchHistory />
      </div>
    </div>
  );
}

export default App;
