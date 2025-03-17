'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useMonthContext } from '@/contexts/MonthContext';
import { formatCurrency } from '@/lib/utils';

interface Budget {
  id: string;
  category: string;
  amount: number;
  month: string; // Format: "YYYY-MM"
}

export default function BudgetsPage() {
  const { selectedMonth } = useMonthContext();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string; color: string }[]>([]);
  const [newBudget, setNewBudget] = useState({
    category: '',
    amount: 0,
  });
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Load budgets from localStorage
  useEffect(() => {
    const loadBudgets = () => {
      const storedBudgets = localStorage.getItem('budgets');
      if (storedBudgets) {
        const parsedBudgets = JSON.parse(storedBudgets);
        setBudgets(parsedBudgets);
      }
    };

    const loadCategories = () => {
      const storedCategories = localStorage.getItem('categories');
      if (storedCategories) {
        const parsedCategories = JSON.parse(storedCategories);
        setCategories(parsedCategories);
        
        // Set default category if available
        if (parsedCategories.length > 0 && !newBudget.category) {
          setNewBudget(prev => ({ ...prev, category: parsedCategories[0].name }));
        }
      } else {
        // Default categories if none are stored
        const defaultCategories = [
          { id: '1', name: 'Food', color: '#FF5733' },
          { id: '2', name: 'Transportation', color: '#33FF57' },
          { id: '3', name: 'Entertainment', color: '#3357FF' },
          { id: '4', name: 'Housing', color: '#F033FF' },
          { id: '5', name: 'Utilities', color: '#FF33A8' },
          { id: '6', name: 'Health', color: '#33FFF5' },
          { id: '7', name: 'Personal', color: '#FFD700' },
          { id: '8', name: 'Education', color: '#8A2BE2' }
        ];
        setCategories(defaultCategories);
        setNewBudget(prev => ({ ...prev, category: defaultCategories[0].name }));
      }
    };

    loadBudgets();
    loadCategories();

    // Add event listener for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'budgets') {
        loadBudgets();
      }
      if (e.key === 'categories') {
        loadCategories();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Save budgets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
    
    // Dispatch a storage event to notify other components
    if (typeof window !== 'undefined') {
      const event = new StorageEvent('storage', {
        key: 'budgets',
        newValue: JSON.stringify(budgets),
        url: window.location.href
      });
      window.dispatchEvent(event);
    }
  }, [budgets]);

  // Filter budgets by selected month
  const filteredBudgets = budgets.filter(budget => budget.month === selectedMonth);

  // Get categories that don't have a budget for the current month
  const availableCategories = categories.filter(
    category => !filteredBudgets.some(budget => budget.category === category.name)
  );

  // Add new budget
  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newBudget.category || newBudget.amount <= 0) {
      alert('Please select a category and enter a valid amount');
      return;
    }
    
    const newBudgetItem: Budget = {
      id: Date.now().toString(),
      category: newBudget.category,
      amount: newBudget.amount,
      month: selectedMonth,
    };
    
    setBudgets([...budgets, newBudgetItem]);
    
    // Reset form
    setNewBudget({
      category: availableCategories.length > 0 ? availableCategories[0].name : '',
      amount: 0,
    });
  };

  // Delete budget
  const handleDeleteBudget = (id: string) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      setBudgets(budgets.filter(budget => budget.id !== id));
    }
  };

  // Open edit modal
  const handleOpenEditModal = (budget: Budget) => {
    setEditingBudget(budget);
    setIsEditModalOpen(true);
  };

  // Update budget
  const handleUpdateBudget = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingBudget) return;
    
    const updatedBudgets = budgets.map(budget => 
      budget.id === editingBudget.id ? editingBudget : budget
    );
    
    setBudgets(updatedBudgets);
    setIsEditModalOpen(false);
    setEditingBudget(null);
  };

  // Get actual spending for a category in the selected month
  const getActualSpending = (category: string) => {
    // Load transactions from localStorage
    const storedTransactions = localStorage.getItem('transactions');
    if (!storedTransactions) return 0;
    
    const transactions = JSON.parse(storedTransactions);
    
    // Filter transactions for the selected month and category
    const filteredTransactions = transactions.filter(
      (tx: any) => tx.date.slice(0, 7) === selectedMonth && tx.category === category && tx.type === 'expense'
    );
    
    // Sum up the amounts
    return filteredTransactions.reduce((sum: number, tx: any) => sum + parseFloat(tx.amount), 0);
  };

  // Calculate progress percentage
  const calculateProgress = (budget: Budget) => {
    const actual = getActualSpending(budget.category);
    const percentage = (actual / budget.amount) * 100;
    return Math.min(percentage, 100); // Cap at 100%
  };

  // Get color for progress bar
  const getProgressColor = (percentage: number) => {
    if (percentage < 70) return 'bg-green-500';
    if (percentage < 90) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Budget Planning</h1>
        
        {/* Add Budget Form */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Create New Budget</h2>
          
          <form onSubmit={handleAddBudget} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <select
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={newBudget.category}
                  onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
                  required
                >
                  <option value="">Select a category</option>
                  {availableCategories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Budget Amount
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={newBudget.amount || ''}
                  onChange={(e) => setNewBudget({ ...newBudget, amount: parseFloat(e.target.value) || 0 })}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              
              <div className="flex items-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  disabled={availableCategories.length === 0}
                >
                  Add Budget
                </button>
              </div>
            </div>
            
            {availableCategories.length === 0 && (
              <p className="text-sm text-yellow-500 dark:text-yellow-400">
                You have already created budgets for all categories this month.
              </p>
            )}
          </form>
        </div>
        
        {/* Budget List */}
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
            Monthly Budgets for {selectedMonth}
          </h2>
          
          {filteredBudgets.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              No budgets set for this month. Create one using the form above.
            </p>
          ) : (
            <div className="space-y-4">
              {filteredBudgets.map((budget) => {
                const actualSpending = getActualSpending(budget.category);
                const percentage = calculateProgress(budget);
                const progressColor = getProgressColor(percentage);
                
                return (
                  <div key={budget.id} className="p-4 border rounded-lg dark:border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        {budget.category}
                      </h3>
                      <div className="space-x-2">
                        <button
                          onClick={() => handleOpenEditModal(budget)}
                          className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteBudget(budget.id)}
                          className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">
                        Budget: {formatCurrency(budget.amount)}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        Actual: {formatCurrency(actualSpending)}
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className={`h-2.5 rounded-full ${progressColor}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-gray-500 dark:text-gray-400">
                        {percentage.toFixed(0)}% used
                      </span>
                      <span className={
                        actualSpending > budget.amount
                          ? 'text-red-500 font-medium'
                          : 'text-gray-500 dark:text-gray-400'
                      }>
                        {actualSpending > budget.amount
                          ? `${formatCurrency(actualSpending - budget.amount)} over budget`
                          : `${formatCurrency(budget.amount - actualSpending)} remaining`
                        }
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Edit Budget Modal */}
        {isEditModalOpen && editingBudget && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                Edit Budget
              </h3>
              
              <form onSubmit={handleUpdateBudget} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Category
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded bg-gray-100 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                    value={editingBudget.category}
                    disabled
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Budget Amount
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={editingBudget.amount || ''}
                    onChange={(e) => setEditingBudget({
                      ...editingBudget,
                      amount: parseFloat(e.target.value) || 0
                    })}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setEditingBudget(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                  >
                    Update Budget
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 