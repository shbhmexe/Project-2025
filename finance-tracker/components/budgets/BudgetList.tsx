'use client';

import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';

// Mock data for budgets
const mockBudgets = [
  { id: '1', category: 'Food', amount: 300, period: 'Monthly' },
  { id: '2', category: 'Transportation', amount: 150, period: 'Monthly' },
  { id: '3', category: 'Entertainment', amount: 100, period: 'Monthly' },
  { id: '4', category: 'Utilities', amount: 200, period: 'Monthly' },
  { id: '5', category: 'Housing', amount: 800, period: 'Monthly' },
  { id: '6', category: 'Shopping', amount: 150, period: 'Monthly' },
  { id: '7', category: 'Healthcare', amount: 100, period: 'Monthly' },
];

export default function BudgetList() {
  const [budgets, setBudgets] = useState(mockBudgets);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle budget deletion
  const handleDelete = (id: string) => {
    setBudgets(budgets.filter(budget => budget.id !== id));
  };

  // Filter budgets based on search term
  const filteredBudgets = budgets.filter(budget => 
    budget.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search budgets..."
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Period</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBudgets.map((budget) => (
              <tr key={budget.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-4 py-3 font-medium">{budget.category}</td>
                <td className="px-4 py-3">{formatCurrency(budget.amount)}</td>
                <td className="px-4 py-3">{budget.period}</td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                      Edit
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      onClick={() => handleDelete(budget.id)}
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