'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { MonthContext } from '@/components/charts/ExpensesChart';
import { TransactionContext, Transaction } from '@/app/contexts/TransactionContext';
import { getCurrentMonthYear, formatCurrency } from '@/lib/utils';

// Get stored transactions from localStorage
const getStoredTransactions = () => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('transactions');
      if (stored) {
        const parsedTransactions: Transaction[] = JSON.parse(stored).map((t: any) => ({
          ...t,
          date: new Date(t.date)
        }));
        return parsedTransactions;
      }
    } catch (error) {
      console.error('Error parsing stored transactions:', error);
    }
  }
  return [];
};

export default function ReportsPage() {
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthYear());
  const [transactions, setTransactions] = useState<Transaction[]>(getStoredTransactions());
  const [reportType, setReportType] = useState('monthly');
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  
  // Load transactions and generate available months on initial render
  useEffect(() => {
    setTransactions(getStoredTransactions());
    
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
  }, []);
  
  // Filter transactions based on selected month or year
  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    
    if (reportType === 'monthly') {
      const [selectedMonthName, selectedYearValue] = selectedMonth.split(' ');
      const monthIndex = new Date(`${selectedMonthName} 1, ${selectedYearValue}`).getMonth();
      const year = parseInt(selectedYearValue);
      
      return transactionDate.getMonth() === monthIndex && transactionDate.getFullYear() === year;
    } else if (reportType === 'yearly') {
      return transactionDate.getFullYear() === parseInt(selectedYear);
    }
    
    return true;
  });
  
  // Calculate total income, expenses, and savings
  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const savings = totalIncome - totalExpenses;
  
  // Group expenses by category
  const expensesByCategory = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const { category, amount } = transaction;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    }, {});
  
  // Sort categories by amount (descending)
  const sortedCategories = Object.entries(expensesByCategory)
    .sort(([, amountA], [, amountB]) => (amountB as number) - (amountA as number))
    .map(([category, amount]) => ({ category, amount }));
  
  return (
    <MonthContext.Provider value={{ selectedMonth, setSelectedMonth }}>
      <TransactionContext.Provider value={{ transactions, setTransactions }}>
        <DashboardLayout>
          <div className="p-4 md:p-6">
            <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Financial Reports</h1>
            
            <div className="mb-6 p-4 bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Report Settings</h2>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Report Type</label>
                    <select
                      className="p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                    >
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                  
                  {reportType === 'monthly' ? (
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Month</label>
                      <select
                        className="p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                      >
                        {availableMonths.map((month) => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Year</label>
                      <select
                        className="p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                      >
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Total Income</h3>
                <p className="text-2xl font-bold text-green-500">{formatCurrency(totalIncome)}</p>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Total Expenses</h3>
                <p className="text-2xl font-bold text-red-500">{formatCurrency(totalExpenses)}</p>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Savings</h3>
                <p className={`text-2xl font-bold ${savings >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {formatCurrency(savings)}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Expenses by Category</h2>
                
                {sortedCategories.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                        <tr>
                          <th className="px-4 py-3">Category</th>
                          <th className="px-4 py-3">Amount</th>
                          <th className="px-4 py-3">Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedCategories.map(({ category, amount }) => (
                          <tr key={category} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-4 py-3">{category}</td>
                            <td className="px-4 py-3">{formatCurrency(amount as number)}</td>
                            <td className="px-4 py-3">
                              {totalExpenses > 0 ? `${(((amount as number) / totalExpenses) * 100).toFixed(1)}%` : '0%'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">No expense data available for this period.</p>
                )}
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Transaction Summary</h2>
                
                {filteredTransactions.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                        <tr>
                          <th className="px-4 py-3">Type</th>
                          <th className="px-4 py-3">Count</th>
                          <th className="px-4 py-3">Total</th>
                          <th className="px-4 py-3">Average</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="px-4 py-3">Income</td>
                          <td className="px-4 py-3">
                            {filteredTransactions.filter(t => t.type === 'income').length}
                          </td>
                          <td className="px-4 py-3 text-green-500">{formatCurrency(totalIncome)}</td>
                          <td className="px-4 py-3">
                            {formatCurrency(
                              totalIncome / (filteredTransactions.filter(t => t.type === 'income').length || 1)
                            )}
                          </td>
                        </tr>
                        <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="px-4 py-3">Expense</td>
                          <td className="px-4 py-3">
                            {filteredTransactions.filter(t => t.type === 'expense').length}
                          </td>
                          <td className="px-4 py-3 text-red-500">{formatCurrency(totalExpenses)}</td>
                          <td className="px-4 py-3">
                            {formatCurrency(
                              totalExpenses / (filteredTransactions.filter(t => t.type === 'expense').length || 1)
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">No transaction data available for this period.</p>
                )}
              </div>
            </div>
          </div>
        </DashboardLayout>
      </TransactionContext.Provider>
    </MonthContext.Provider>
  );
} 