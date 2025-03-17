'use client';

import { useState } from 'react';

// Mock data for categories
const mockCategories = [
  { id: '1', name: 'Food', color: '#3b82f6', icon: '🍔' },
  { id: '2', name: 'Transportation', color: '#ef4444', icon: '🚗' },
  { id: '3', name: 'Entertainment', color: '#10b981', icon: '🎬' },
  { id: '4', name: 'Utilities', color: '#f59e0b', icon: '💡' },
  { id: '5', name: 'Housing', color: '#8b5cf6', icon: '🏠' },
  { id: '6', name: 'Healthcare', color: '#ec4899', icon: '🏥' },
  { id: '7', name: 'Personal', color: '#6366f1', icon: '👤' },
  { id: '8', name: 'Education', color: '#14b8a6', icon: '📚' },
  { id: '9', name: 'Shopping', color: '#f97316', icon: '🛍️' },
  { id: '10', name: 'Other', color: '#64748b', icon: '📌' },
];

export default function CategoryList() {
  const [categories, setCategories] = useState(mockCategories);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle category deletion
  const handleDelete = (id: string) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search categories..."
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3">Icon</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Color</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category) => (
              <tr key={category.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-4 py-3 text-xl">{category.icon}</td>
                <td className="px-4 py-3 font-medium">{category.name}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div 
                      className="w-6 h-6 mr-2 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span>{category.color}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                      Edit
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      onClick={() => handleDelete(category.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 