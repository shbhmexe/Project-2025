import React from 'react';
import './Header.css';

const Header = ({ user, onLogout }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="app-title">🔍 Image Search</h1>
        <div className="user-section">
          {user.avatar && (
            <img src={user.avatar} alt={user.name} className="user-avatar" />
          )}
          <span className="user-name">{user.name}</span>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
