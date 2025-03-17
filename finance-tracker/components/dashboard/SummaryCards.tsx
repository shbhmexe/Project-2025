'use client';

import { useState, useEffect, useRef } from 'react';
import { formatCurrency, calculateTotal, getCurrentMonthYear } from '@/lib/utils';
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

export default function SummaryCards() {
  const { selectedMonth, setSelectedMonth } = useMonthContext();
  const { transactions } = useTransactionContext();
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [avgTransaction, setAvgTransaction] = useState(0);
  const [topCategory, setTopCategory] = useState('');
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowMonthDropdown(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Generate available months (Jan 2024 to Dec 2025)
    const months = [];
    for (let year = 2024; year <= 2025; year++) {
      for (let month = 0; month < 12; month++) {
        const date = new Date(year, month, 1);
        const monthYear = new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
        }).format(date);
        months.push(monthYear);
      }
    }
    
    // Sort months chronologically
    months.sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA.getTime() - dateB.getTime();
    });
    
    setAvailableMonths(months);

    // Set the initial selected month to the current month
    const currentMonth = getCurrentMonthYear();
    setSelectedMonth(currentMonth);
  }, []);

  useEffect(() => {
    // Filter transactions for the selected month
    const [selectedMonthName, selectedYear] = selectedMonth.split(' ');
    const monthIndex = new Date(`${selectedMonthName} 1, ${selectedYear}`).getMonth();
    const year = parseInt(selectedYear);
    
    const filteredTransactions = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getMonth() === monthIndex && transactionDate.getFullYear() === year;
    });
    
    // For months after March 2025, set all values to zero
    const selectedDate = new Date(`${selectedMonthName} 1, ${selectedYear}`);
    const march2025 = new Date('March 1, 2025');
    
    if (selectedDate > march2025) {
      setTotalExpenses(0);
      setAvgTransaction(0);
      setTopCategory('N/A');
    } else {
      // Calculate total expenses
      const total = calculateTotal(filteredTransactions);
      setTotalExpenses(total);
      
      // Calculate average transaction
      const avg = filteredTransactions.length > 0 ? total / filteredTransactions.length : 0;
      setAvgTransaction(avg);
      
      // Find top category
      const categoryTotals: Record<string, number> = {};
      filteredTransactions.forEach(transaction => {
        if (!categoryTotals[transaction.category]) {
          categoryTotals[transaction.category] = 0;
        }
        categoryTotals[transaction.category] += transaction.amount;
      });
      
      const categories = Object.entries(categoryTotals);
      const topCat = categories.length > 0 ? categories.sort((a, b) => b[1] - a[1])[0][0] : 'N/A';
      setTopCategory(topCat);
    }
  }, [selectedMonth, transactions]);

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    setShowMonthDropdown(false);
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <SummaryCard 
        title="Total Expenses"
        value={formatCurrency(totalExpenses)}
        icon="💰"
        color="bg-blue-500"
      />
      <SummaryCard 
        title="Average Transaction"
        value={formatCurrency(avgTransaction)}
        icon="📊"
        color="bg-green-500"
      />
      <SummaryCard 
        title="Top Category"
        value={topCategory}
        icon="🏆"
        color="bg-purple-500"
      />
      <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-500">
            <span className="text-xl text-white">📅</span>
          </div>
          <div className="ml-4 relative w-full" ref={dropdownRef}>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Month</h3>
            <div 
              className="text-lg font-semibold text-gray-800 dark:text-white flex items-center cursor-pointer"
              onClick={() => setShowMonthDropdown(!showMonthDropdown)}
            >
              {selectedMonth}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
            
            {showMonthDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg dark:bg-gray-700 max-h-60 overflow-y-auto">
                {availableMonths.map((month) => {
                  const isSelected = month === selectedMonth;
                  return (
                    <div 
                      key={month} 
                      className={`px-4 py-2 text-sm cursor-pointer ${
                        isSelected 
                          ? 'bg-blue-500 text-white font-medium' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                      onClick={() => handleMonthSelect(month)}
                    >
                      {month}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface SummaryCardProps {
  title: string;
  value: string;
  icon: string;
  color: string;
}

function SummaryCard({ title, value, icon, color }: SummaryCardProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
      <div className="flex items-center">
        <div className={`flex items-center justify-center w-12 h-12 rounded-full ${color}`}>
          <span className="text-xl text-white">{icon}</span>
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <p className="text-lg font-semibold text-gray-800 dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  );
} 