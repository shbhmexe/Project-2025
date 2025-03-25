import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearTasks } from '../../redux/slices/taskSlice';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { tasks } = useSelector(state => state.tasks);
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const dispatch = useDispatch();
  
  const filteredTasks = tasks.filter(task => {
    // Filter by priority
    if (filterPriority !== 'All' && task.priority !== filterPriority) {
      return false;
    }
    
    // Filter by status
    if (filterStatus === 'Completed' && !task.completed) {
      return false;
    }
    if (filterStatus === 'Active' && task.completed) {
      return false;
    }
    
    return true;
  });
  
  // Sort tasks by priority and creation date
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    // If priorities are equal, sort by creation date (newest first)
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  
  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white py-3">
        <h3 className="card-title mb-0 d-flex align-items-center">
          <i className="bi bi-list-check me-2"></i>
          Your Tasks
        </h3>
      </div>
      <div className="card-body p-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div className="d-flex gap-2 mb-2 mb-md-0">
            <select
              className="form-select form-select-sm"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              aria-label="Filter by priority"
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
            
            <select
              className="form-select form-select-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              aria-label="Filter by status"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          
          {tasks.length > 0 && (
            <button 
              className="btn btn-sm btn-outline-danger"
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all tasks?')) {
                  dispatch(clearTasks());
                }
              }}
            >
              <i className="bi bi-trash me-1"></i>
              Clear All
            </button>
          )}
        </div>
        
        {sortedTasks.length === 0 ? (
          <div className="alert alert-info d-flex align-items-center">
            <i className="bi bi-info-circle-fill me-2 fs-4"></i>
            <div>
              {tasks.length === 0 ? 
                'Your task list is empty. Add a new task to get started!' :
                'No tasks match your current filters.'}
            </div>
          </div>
        ) : (
          <div className="task-list">
            {sortedTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
            <div className="text-muted mt-3">
              <i className="bi bi-card-checklist me-1"></i>
              Showing {sortedTasks.length} of {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
              {filterPriority !== 'All' && ` with ${filterPriority} priority`}
              {filterStatus !== 'All' && ` (${filterStatus})`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;