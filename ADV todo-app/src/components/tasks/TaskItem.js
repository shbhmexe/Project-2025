import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, updateTaskPriority, toggleTaskComplete } from '../../redux/slices/taskSlice';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const { weatherData, loading } = useSelector(state => state.tasks);
  
  const priorityClasses = {
    High: 'bg-danger',
    Medium: 'bg-warning',
    Low: 'bg-info'
  };
  
  const handlePriorityChange = (e) => {
    dispatch(updateTaskPriority({ id: task.id, priority: e.target.value }));
  };
  
  return (
    <div className={`card mb-2 ${task.completed ? 'border-success' : ''}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(toggleTaskComplete(task.id))}
              id={`task-${task.id}`}
            />
            <label 
              className={`form-check-label ${task.completed ? 'text-decoration-line-through' : ''}`}
              htmlFor={`task-${task.id}`}
            >
              {task.text}
            </label>
          </div>
          
          <div className="d-flex">
            <select 
              className={`form-select form-select-sm me-2 ${priorityClasses[task.priority]}`}
              value={task.priority}
              onChange={handlePriorityChange}
              style={{ width: '100px' }}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            
            <button 
              className="btn btn-sm btn-outline-danger"
              onClick={() => dispatch(deleteTask(task.id))}
            >
              Delete
            </button>
          </div>
        </div>
        
        {task.location && (
          <div className="mt-2 small">
            <strong>Location:</strong> {task.location}
            {weatherData[task.location] && (
              <div className="weather-info mt-1">
                <div className="d-flex align-items-center">
                  <strong>Weather:</strong> 
                  <span className="ms-1">
                    {weatherData[task.location].main.temp}°C, 
                    {weatherData[task.location].weather[0].description}
                  </span>
                </div>
              </div>
            )}
            {loading && <div className="spinner-border spinner-border-sm text-primary mt-1" role="status"></div>}
          </div>
        )}
        
        <div className="text-muted small mt-1">
          Created: {new Date(task.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;