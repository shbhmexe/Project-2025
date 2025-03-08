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
    
    setTaskText('');
    setPriority('Medium');
    setLocation('');
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h3 className="card-title">Add New Task</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="taskInput" className="form-label">Task Description</label>
            <input
              type="text"
              className="form-control"
              id="taskInput"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="Enter your task here"
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="prioritySelect" className="form-label">Priority</label>
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
          
          <div className="mb-3">
            <label htmlFor="locationInput" className="form-label">Location (for weather info)</label>
            <input
              type="text"
              className="form-control"
              id="locationInput"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., New York, London, etc."
            />
            <div className="form-text">Optional: Add location to see weather information</div>
          </div>
          
          <button type="submit" className="btn btn-primary">Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default TaskInput;