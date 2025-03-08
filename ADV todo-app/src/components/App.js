import React from 'react';
import { useSelector } from 'react-redux';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Login from './auth/Login';
import TaskInput from './tasks/TaskInput';
import TaskList from './tasks/TaskList';
import './App.css';

function App() {
  const { isAuthenticated } = useSelector(state => state.auth);
  
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="container flex-grow-1">
        {!isAuthenticated ? (
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="alert alert-info">
                Please log in to access your to-do list. Use any username and password.
              </div>
              <Login />
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-4">
              <TaskInput />
            </div>
            <div className="col-md-8">
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