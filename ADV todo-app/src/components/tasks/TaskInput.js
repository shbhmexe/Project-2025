import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, fetchWeatherForTask } from '../../redux/slices/taskSlice';

const TaskInput = () => {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [location, setLocation] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    dispatch(addTask({ text: taskText, priority, location }));
    
    // If location is provided, fetch weather data
    if (location.trim()) {
      dispatch(fetchWeatherForTask(location));
    }
    
    resetForm();
  };

  const resetForm = () => {
    setTaskText('');
    setPriority('Medium');
    setLocation('');
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-primary text-white py-3">
        <h3 className="card-title mb-0 d-flex align-items-center">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Task
        </h3>
      </div>
      <div className="card-body p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="taskInput" className="form-label d-flex align-items-center">
              <i className="bi bi-pencil me-2"></i>
              Task Description
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="taskInput"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="What needs to be done?"
              autoFocus
            />
          </div>
          
          <div className="row mb-3">
            <div className="col-md-6 mb-3 mb-md-0">
              <label htmlFor="prioritySelect" className="form-label d-flex align-items-center">
                <i className="bi bi-flag me-2"></i>
                Priority
              </label>
              <select
                className="form-select"
                id="prioritySelect"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            
            <div className="col-md-6">
              <label htmlFor="locationInput" className="form-label d-flex align-items-center">
                <i className="bi bi-geo-alt me-2"></i>
                Location
              </label>
              <input
                type="text"
                className="form-control"
                id="locationInput"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., New York, London, etc."
              />
              <div className="form-text">Add location to see weather information</div>
            </div>
          </div>
          
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary px-4">
              <i className="bi bi-plus-lg me-1"></i> Add Task
            </button>
            <button 
              type="button" 
              className="btn btn-outline-secondary"
              onClick={resetForm}
            >
              <i className="bi bi-x-lg me-1"></i> Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskInput;