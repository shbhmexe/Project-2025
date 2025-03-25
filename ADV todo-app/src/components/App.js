import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ThemeContext } from '../utils/themeContext';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Login from './auth/Login';
import TaskInput from './tasks/TaskInput';
import TaskList from './tasks/TaskList';
import './App.css';

function App() {
  const { isAuthenticated } = useSelector(state => state.auth);
  const { currentTheme } = useContext(ThemeContext);
  
  return (
    <div className={`d-flex flex-column min-vh-100 ${currentTheme.name === 'dark' ? 'dark-mode' : ''}`}>
      <Header />
      <main className="container py-3 flex-grow-1">
        {!isAuthenticated ? (
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6 col-md-8">
              <div className="text-center mb-4">
                <h1 className="display-6 fw-bold">
                  <i className="bi bi-check2-all me-2 text-primary"></i>
                  Advanced Todo Application
                </h1>
                <p className="lead">Manage your tasks efficiently with our advanced features</p>
              </div>
              
              <div className="alert alert-info d-flex align-items-center mb-4">
                <i className="bi bi-info-circle-fill me-2 fs-4"></i>
                <div>
                  Please log in to access your to-do list. You can use any username and password for this demo.
                </div>
              </div>
              
              <Login />
            </div>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-4 col-md-5">
              <TaskInput />
            </div>
            <div className="col-lg-8 col-md-7">
              <TaskList />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;