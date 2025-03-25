import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, authError } from '../../redux/slices/authSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!username.trim() || !password.trim()) {
      dispatch(authError('Username and password are required'));
      return;
    }
    
    // Simulate loading state
    setIsLoading(true);
    
    // Mock authentication process with a slight delay
    setTimeout(() => {
      dispatch(login({ username }));
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="card shadow-lg border-0 rounded-lg">
      <div className="card-header bg-primary text-white">
        <h3 className="text-center font-weight-light my-2">
          <i className="bi bi-person-circle me-2"></i>
          Login
        </h3>
      </div>
      <div className="card-body p-4">
        {error && (
          <div className="alert alert-danger d-flex align-items-center" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            <div>{error}</div>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              <i className="bi bi-person me-1"></i> Username
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-person-fill"></i>
              </span>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                autoFocus
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              <i className="bi bi-key me-1"></i> Password
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock-fill"></i>
              </span>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="form-text">
              Use any username and password to log in (this is a demo).
            </div>
          </div>
          
          <div className="d-grid">
            <button 
              type="submit" 
              className="btn btn-primary btn-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Logging in...
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Login
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;