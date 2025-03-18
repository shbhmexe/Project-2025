'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import TransactionList from '@/components/transactions/TransactionList';
import { useMonthContext, MonthContext } from '@/components/charts/ExpensesChart';
import { formatCurrency, formatDate, getCurrentMonthYear } from '@/lib/utils';
import { TransactionContext } from '@/app/contexts/TransactionContext';

// Default categories if none exist in localStorage
const defaultCategories = [
  { id: '1', name: 'Food', color: '#ef4444' },
  { id: '2', name: 'Utilities', color: '#3b82f6' },
  { id: '3', name: 'Shopping', color: '#10b981' },
  { id: '4', name: 'Transportation', color: '#f59e0b' },
  { id: '5', name: 'Entertainment', color: '#8b5cf6' },
];

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
  return defaultCategories;
};

// Get stored transactions from localStorage or use empty array as default
const getStoredTransactions = () => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('transactions');
      if (stored) {
        const parsedTransactions = JSON.parse(stored);
        return parsedTransactions.map((t) => ({
          ...t,
          date: new Date(t.date)
        }));
      }
    } catch (error) {
      console.error('Error parsing stored transactions:', error);
    }
  }
  return [];
};

export default function TransactionsPage() {
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthYear());
  const [transactions, setTransactions] = useState(getStoredTransactions());
  const [categories, setCategories] = useState(getStoredCategories());
  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    description: '',
    category: categories.length > 0 ? categories[0].name : 'Food',
    date: new Date().toISOString().split('T')[0]
  });

  // Load transactions and categories from localStorage on initial render
  useEffect(() => {
    setTransactions(getStoredTransactions());
    setCategories(getStoredCategories());
  }, []);
  
  // Refresh categories whenever localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setCategories(getStoredCategories());
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined' && transactions.length > 0) {
      // Convert dates to strings before storing
      const transactionsToStore = transactions.map(t => ({
        ...t,
        date: t.date.toISOString()
      }));
      localStorage.setItem('transactions', JSON.stringify(transactionsToStore));
    }
  }, [transactions]);

  const handleAddTransaction = () => {
    if (!newTransaction.amount || !newTransaction.description) return;
    
    // Create a new transaction
    const newTrans = {
      id: Date.now().toString(),
      amount: parseFloat(newTransaction.amount),
      description: newTransaction.description,
      category: newTransaction.category,
      date: new Date(newTransaction.date)
    };
    
    // Add to transactions
    const updatedTransactions = [...transactions, newTrans];
    setTransactions(updatedTransactions);
    
    // Reset form with the current first category
    setNewTransaction({
      amount: '',
      description: '',
      category: categories.length > 0 ? categories[0].name : 'Food',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <MonthContext.Provider value={{ selectedMonth, setSelectedMonth }}>
      <TransactionContext.Provider value={{ transactions, setTransactions }}>
        <DashboardLayout>
          <div className="p-4 md:p-6">
            <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Transactions</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-4">
                  <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Transaction History</h2>
                  <TransactionList showAddButton={false} />
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-4">
                  <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Add Transaction</h2>
                  
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Amount</label>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        value={newTransaction.amount}
                        onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Date</label>
                      <input
                        type="date"
                        className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        value={newTransaction.date}
                        onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Description</label>
                      <input
                        type="text"
                        placeholder="Enter description"
                        className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        value={newTransaction.description}
                        onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Category</label>
                      <select
                        className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        value={newTransaction.category}
                        onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                      >
                        {categories.map((category) => (
                          <option 
                            key={category.id} 
                            value={category.name}
                            style={{ backgroundColor: category.color + '20' }} // Light background of the category color
                          >
                            <span style={{ backgroundColor: category.color }} className="inline-block w-3 h-3 rounded-full mr-2"></span>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <button 
                      className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={handleAddTransaction}
                    >
                      Add Transaction
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DashboardLayout>
      </TransactionContext.Provider>
    </MonthContext.Provider>
  );
} 