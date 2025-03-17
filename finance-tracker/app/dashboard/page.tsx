'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import TransactionList from '@/components/transactions/TransactionList';
import ExpensesChart, { MonthContext } from '@/components/charts/ExpensesChart';
import CategoryPieChart from '@/components/charts/CategoryPieChart';
import SummaryCards from '@/components/dashboard/SummaryCards';
import { getCurrentMonthYear } from '@/lib/utils';

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

// Create a context for transactions
export const TransactionContext = createContext<{
  transactions: any[];
  setTransactions: (transactions: any[]) => void;
}>({
  transactions: [],
  setTransactions: () => {},
});

// Hook to use the transaction context
export const useTransactionContext = () => useContext(TransactionContext);

export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthYear());
  const [transactions, setTransactions] = useState(getStoredTransactions());

  // Load transactions from localStorage on initial render
  useEffect(() => {
    setTransactions(getStoredTransactions());
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

  return (
    <MonthContext.Provider value={{ selectedMonth, setSelectedMonth }}>
      <TransactionContext.Provider value={{ transactions, setTransactions }}>
        <DashboardLayout>
          <div className="p-4 md:p-6">
            <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Financial Dashboard</h1>
            
            <SummaryCards />
            
            <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-2">
              <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Monthly Expenses</h2>
                <div className="h-64">
                  <ExpensesChart />
                </div>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Spending by Category</h2>
                <div className="h-64">
                  <CategoryPieChart />
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Recent Transactions</h2>
                <TransactionList showAddButton={true} />
              </div>
            </div>
          </div>
        </DashboardLayout>
      </TransactionContext.Provider>
    </MonthContext.Provider>
  );
} 