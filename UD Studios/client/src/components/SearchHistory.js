import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchHistory.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const SearchHistory = () => {
  const [history, setHistory] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    fetchHistory();
    const interval = setInterval(fetchHistory, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/history`);
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`search-history ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="history-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h3>📜 Search History</h3>
        <button className="toggle-btn">{isExpanded ? '▼' : '▲'}</button>
      </div>
      
      {isExpanded && (
        <div className="history-content">
          {history.length === 0 ? (
            <p className="empty-history">No search history yet</p>
          ) : (
            <ul className="history-list">
              {history.map((item, index) => (
                <li key={index} className="history-item">
                  <span className="history-term">{item.term}</span>
                  <span className="history-time">{formatDate(item.timestamp)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchHistory;
