'use client';

import { useState, useEffect } from 'react';
import { formatCurrency, formatDate } from '@/lib/utils';
import EditTransactionModal from './EditTransactionModal';
import { useMonthContext } from '@/components/charts/ExpensesChart';
import { useTransactionContext } from '@/app/dashboard/page';

// Mock data for transactions
const mockTransactions = [
  { id: '1', amount: 120.50, date: new Date('2024-01-01'), description: 'Grocery shopping', category: 'Food' },
  { id: '2', amount: 45.00, date: new Date('2024-01-15'), description: 'Gas station', category: 'Transportation' },
  { id: '3', amount: 9.99, date: new Date('2024-02-03'), description: 'Netflix subscription', category: 'Entertainment' },
  { id: '4', amount: 200.00, date: new Date('2024-02-15'), description: 'Electricity bill', category: 'Utilities' },
  { id: '5', amount: 60.00, date: new Date('2024-02-28'), description: 'Dinner with friends', category: 'Food' },
  { id: '6', amount: 75.50, date: new Date('2025-01-10'), description: 'Shopping', category: 'Shopping' },
  { id: '7', amount: 110.25, date: new Date('2025-02-05'), description: 'Internet bill', category: 'Utilities' },
  { id: '8', amount: 85.75, date: new Date('2025-03-01'), description: 'Grocery shopping', category: 'Food' },
  { id: '9', amount: 0, date: new Date('2025-04-01'), description: 'No expenses', category: 'Utilities' },
];

type Transaction = {
  id: string;
  amount: number;
  date: Date;
  description: string;
  category: string;
};

// Get stored transactions from localStorage or use mockTransactions as default
const getStoredTransactions = () => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('transactions');
      if (stored) {
        // Convert string dates back to Date objects
        const parsedTransactions = JSON.parse(stored);
        return parsedTransactions.map((t: any) => ({
          ...t,
          date: new Date(t.date)
        }));
      }
    } catch (error) {
      console.error('Error parsing stored transactions:', error);
    }
  }
  return mockTransactions;
};

// Get stored categories from localStorage
const getStoredCategories = () => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('categories');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error parsing stored categories:', error);
    }
  }
  return [
    { id: '1', name: 'Food', color: '#ef4444' },
    { id: '2', name: 'Utilities', color: '#3b82f6' },
    { id: '3', name: 'Shopping', color: '#10b981' },
    { id: '4', name: 'Transportation', color: '#f59e0b' },
    { id: '5', name: 'Entertainment', color: '#8b5cf6' },
  ];
};

// Get category color by name
const getCategoryColor = (categoryName, categories) => {
  const category = categories.find(cat => cat.name === categoryName);
  return category ? category.color : '#3b82f6'; // Default blue if not found
};

export default function TransactionList({ 
  showAddButton = true
}: { 
  showAddButton?: boolean;
}) {
  const { selectedMonth } = useMonthContext();
  const { transactions, setTransactions } = useTransactionContext();
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);
  const [editingTransaction, setEditingTransaction] = useState<any | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [categories, setCategories] = useState(getStoredCategories());
  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    description: '',
    category: categories.length > 0 ? categories[0].name : 'Food',
    date: new Date().toISOString().split('T')[0]
  });

  // Load categories from localStorage
  useEffect(() => {
    setCategories(getStoredCategories());
  }, []);

  // Listen for changes to localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setCategories(getStoredCategories());
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // Parse the selected month and year
    const [selectedMonthName, selectedYear] = selectedMonth.split(' ');
    const monthIndex = new Date(`${selectedMonthName} 1, ${selectedYear}`).getMonth();
    const year = parseInt(selectedYear);
    const selectedDate = new Date(`${selectedMonthName} 1, ${selectedYear}`);
    const march2025 = new Date('March 1, 2025');
    
    // For months after March 2025, show no transactions
    if (selectedDate > march2025) {
      setFilteredTransactions([]);
      return;
    }
    
    // Filter transactions for the selected month
    const filtered = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getMonth() === monthIndex && transactionDate.getFullYear() === year;
    });
    
    // If no transactions for the selected month but before March 2025, generate random ones
    if (filtered.length === 0 && selectedDate < march2025) {
      const randomTransactions = [
        { 
          id: `random-${Math.random().toString(36).substring(2, 9)}`, 
          amount: Math.floor(Math.random() * 100) + 20, 
          date: new Date(year, monthIndex, Math.floor(Math.random() * 28) + 1), 
          description: 'Grocery shopping', 
          category: 'Food' 
        },
        { 
          id: `random-${Math.random().toString(36).substring(2, 9)}`, 
          amount: Math.floor(Math.random() * 80) + 30, 
          date: new Date(year, monthIndex, Math.floor(Math.random() * 28) + 1), 
          description: 'Utilities bill', 
          category: 'Utilities' 
        },
        { 
          id: `random-${Math.random().toString(36).substring(2, 9)}`, 
          amount: Math.floor(Math.random() * 50) + 10, 
          date: new Date(year, monthIndex, Math.floor(Math.random() * 28) + 1), 
          description: 'Transportation', 
          category: 'Transportation' 
        }
      ];
      setFilteredTransactions(randomTransactions);
    } else {
      setFilteredTransactions(filtered);
    }
  }, [selectedMonth, transactions]);

  // Function to handle sorting
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Function to get sorted transactions
  const getSortedTransactions = () => {
    if (!sortConfig) return filteredTransactions;

    return [...filteredTransactions].sort((a: any, b: any) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  // Function to handle transaction deletion
  const handleDelete = (id: string) => {
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
    setTransactions(updatedTransactions);
  };

  // Function to open edit modal
  const handleEdit = (transaction: any) => {
    setEditingTransaction(transaction);
    setIsEditModalOpen(true);
  };

  // Function to handle transaction update
  const handleUpdate = (id: string, updatedData: any) => {
    const updatedTransactions = transactions.map(transaction => 
      transaction.id === id 
        ? { 
            ...transaction, 
            ...updatedData,
            date: typeof updatedData.date === 'string' 
              ? new Date(updatedData.date) 
              : updatedData.date
          } 
        : transaction
    );
    
    setTransactions(updatedTransactions);
  };

  // Function to add a new transaction
  const handleAddTransaction = () => {
    if (!newTransaction.amount || !newTransaction.description) return;
    
    // Create a new transaction
    const newTrans = {
      id: Date.now().toString(),
      amount: parseFloat(newTransaction.amount),
      date: new Date(newTransaction.date),
      description: newTransaction.description,
      category: newTransaction.category
    };
    
    // Add to transactions
    setTransactions([...transactions, newTrans]);
    
    // Reset form
    setNewTransaction({
      amount: '',
      description: '',
      category: categories.length > 0 ? categories[0].name : 'Food',
      date: new Date().toISOString().split('T')[0]
    });
    
    setShowAddForm(false);
  };

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
          Transactions for {selectedMonth}
        </h3>
        {showAddButton && (
          <button 
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'Cancel' : '+ Add Transaction'}
          </button>
        )}
      </div>
      
      {showAddForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg dark:bg-gray-700">
          <h4 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Add New Transaction</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-xs mb-1 text-gray-600 dark:text-gray-400">Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                value={newTransaction.date}
                onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs mb-1 text-gray-600 dark:text-gray-400">Amount</label>
              <input
                type="number"
                placeholder="Amount"
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs mb-1 text-gray-600 dark:text-gray-400">Description</label>
              <input
                type="text"
                placeholder="Description"
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs mb-1 text-gray-600 dark:text-gray-400">Category</label>
              <select
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                value={newTransaction.category}
                onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
              >
                {categories.map(category => (
                  <option 
                    key={category.id} 
                    value={category.name}
                    style={{ backgroundColor: category.color + '20' }}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleAddTransaction}
            >
              Add Transaction
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3 cursor-pointer" onClick={() => requestSort('date')}>
                Date
                {sortConfig?.key === 'date' && (
                  <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                )}
              </th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => requestSort('description')}>
                Description
                {sortConfig?.key === 'description' && (
                  <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                )}
              </th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => requestSort('category')}>
                Category
                {sortConfig?.key === 'category' && (
                  <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                )}
              </th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => requestSort('amount')}>
                Amount
                {sortConfig?.key === 'amount' && (
                  <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                )}
              </th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getSortedTransactions().length > 0 ? (
              getSortedTransactions().map((transaction) => (
                <tr key={transaction.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-4 py-3">{formatDate(transaction.date)}</td>
                  <td className="px-4 py-3">{transaction.description}</td>
                  <td className="px-4 py-3">
                    <span 
                      className="px-2 py-1 text-xs font-semibold rounded-full" 
                      style={{ 
                        backgroundColor: getCategoryColor(transaction.category, categories) + '20',
                        color: getCategoryColor(transaction.category, categories)
                      }}
                    >
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium">{formatCurrency(transaction.amount)}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        onClick={() => handleEdit(transaction)}
                      >
                        Edit
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        onClick={() => handleDelete(transaction.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-b dark:border-gray-700">
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                  No transactions found for this month
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <EditTransactionModal
        transaction={editingTransaction}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingTransaction(null);
        }}
        onSave={handleUpdate}
      />
    </>
  );
} 