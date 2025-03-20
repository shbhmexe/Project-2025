'use client';

import { useEffect } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import TransactionList from '@/components/transactions/TransactionList';
import ExpensesChart from '@/components/charts/ExpensesChart';
import CategoryPieChart from '@/components/charts/CategoryPieChart';
import SummaryCards from '@/components/dashboard/SummaryCards';
import { useTransactionContext } from '@/app/contexts/TransactionContext';

export default function Dashboard() {
  const { transactions, setTransactions } = useTransactionContext();
  
  // Get stored transactions from localStorage
  useEffect(() => {
    const getStoredTransactions = () => {
      if (typeof window === 'undefined') return [];
      
      try {
        const stored = localStorage.getItem('transactions');
        return stored ? JSON.parse(stored) : [];
      } catch (error) {
        console.error('Error parsing stored transactions:', error);
        return [];
      }
    };

    const storedTransactions = getStoredTransactions();
    setTransactions(storedTransactions);
  }, [setTransactions]);
  
  // Save transactions to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }, [transactions]);
  
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          <SummaryCards />
          <ExpensesChart />
          <TransactionList 
            limit={5} 
            showAddButton={true} 
          />
        </div>
        <div className="md:col-span-4">
          <CategoryPieChart />
        </div>
      </div>
    </DashboardLayout>
  );
} 