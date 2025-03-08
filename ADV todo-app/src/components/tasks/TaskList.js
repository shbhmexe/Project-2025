import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { tasks } = useSelector(state => state.tasks);
  const [filterPriority, setFilterPriority] = useState('All');
  
  const filteredTasks = tasks.filter(task => {
    if (filterPriority === 'All') return true;
    return task.priority === filterPriority;
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
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="card-title mb-0">Task List</h3>
          <div className="d-flex align-items-center">
            <label className="me-2">Filter by Priority:</label>
            <select
              className="form-select form-select-sm"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              style={{ width: '120px' }}
            >
              <option value="All">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
        
        {sortedTasks.length === 0 ? (
          <div className="alert alert-info">No tasks available. Add a new task to get started!</div>
        ) : (
          <div>
            {sortedTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
            <div className="text-muted mt-2">
              Showing {sortedTasks.length} {sortedTasks.length === 1 ? 'task' : 'tasks'}
              {filterPriority !== 'All' ? ` with ${filterPriority} priority` : ''}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList