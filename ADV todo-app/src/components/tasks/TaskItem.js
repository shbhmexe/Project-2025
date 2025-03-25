import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, updateTaskPriority, toggleTaskComplete } from '../../redux/slices/taskSlice';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const { weatherData, loading } = useSelector(state => state.tasks);
  
  const priorityBadges = {
    High: 'bg-danger text-white',
    Medium: 'bg-warning text-dark',
    Low: 'bg-info text-white'
  };
  
  return (
    <div className={`card mb-3 shadow-sm ${task.completed ? 'border-success' : ''}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div className="d-flex align-items-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(toggleTaskComplete(task.id))}
                id={`task-${task.id}`}
              />
              <label 
                className={`form-check-label h5 mb-0 ${task.completed ? 'text-decoration-line-through text-muted' : 'fw-bold'}`}
                htmlFor={`task-${task.id}`}
              >
                {task.text}
              </label>
            </div>
          </div>
          
          <div className="d-flex">
            <div className="dropdown me-2">
              <button 
                className={`btn btn-sm dropdown-toggle ${priorityBadges[task.priority]}`}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {task.priority}
              </button>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item" onClick={() => dispatch(updateTaskPriority({ id: task.id, priority: 'High' }))}>High</button></li>
                <li><button className="dropdown-item" onClick={() => dispatch(updateTaskPriority({ id: task.id, priority: 'Medium' }))}>Medium</button></li>
                <li><button className="dropdown-item" onClick={() => dispatch(updateTaskPriority({ id: task.id, priority: 'Low' }))}>Low</button></li>
              </ul>
            </div>
            
            <button 
              className="btn btn-sm btn-outline-danger"
              onClick={() => dispatch(deleteTask(task.id))}
            >
              <i className="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>
        
        {task.location && (
          <div className="mt-3 p-2 bg-light rounded">
            <div className="d-flex align-items-center">
              <i className="bi bi-geo-alt me-1"></i>
              <strong>Location:</strong> <span className="ms-1">{task.location}</span>
            </div>
            
            {weatherData[task.location] && (
              <div className="weather-info mt-2 d-flex align-items-center">
                <i className="bi bi-cloud me-1"></i>
                <strong>Weather:</strong> 
                <span className="ms-1">
                  {weatherData[task.location].main.temp}°C, 
                  {' ' + weatherData[task.location].weather[0].description}
                </span>
              </div>
            )}
            
            {loading && (
              <div className="d-flex align-items-center mt-2">
                <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                <span>Loading weather data...</span>
              </div>
            )}
          </div>
        )}
        
        <div className="text-muted small mt-2">
          <i className="bi bi-calendar-event me-1"></i>
          Created: {new Date(task.createdAt).toLocaleDateString()} at {new Date(task.createdAt).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;