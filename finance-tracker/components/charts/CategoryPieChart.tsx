'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { formatCurrency, groupByCategory } from '@/lib/utils';
import { useMonthContext } from './ExpensesChart';
import { useTransactionContext } from '@/app/contexts/TransactionContext';

// Mock data for transactions
const mockTransactions = [
  { id: '1', amount: 120.50, date: new Date('2024-01-01'), description: 'Grocery shopping', category: 'Food' },
  { id: '2', amount: 45.00, date: new Date('2024-01-15'), description: 'Gas station', category: 'Transportation' },
  { id: '3', amount: 9.99, date: new Date('2024-02-03'), description: 'Netflix subscription', category: 'Entertainment' },
  { id: '4', amount: 200.00, date: new Date('2024-02-15'), description: 'Electricity bill', category: 'Utilities' },
  { id: '5', amount: 60.00, date: new Date('2024-02-28'), description: 'Dinner with friends', category: 'Food' },
  { id: '6', amount: 80.00, date: new Date('2024-03-15'), description: 'Clothing', category: 'Shopping' },
  { id: '7', amount: 150.00, date: new Date('2024-03-20'), description: 'Internet bill', category: 'Utilities' },
  { id: '8', amount: 35.00, date: new Date('2024-03-25'), description: 'Books', category: 'Education' },
  { id: '9', amount: 75.50, date: new Date('2025-01-10'), description: 'Shopping', category: 'Shopping' },
  { id: '10', amount: 110.25, date: new Date('2025-02-05'), description: 'Internet bill', category: 'Utilities' },
  { id: '11', amount: 85.75, date: new Date('2025-03-01'), description: 'Grocery shopping', category: 'Food' },
  { id: '12', amount: 0, date: new Date('2025-04-01'), description: 'No expenses', category: 'Utilities' },
];

// Fallback colors for categories (only used if no category definition is found)
const FALLBACK_COLORS = [
  '#3b82f6', // blue
  '#ef4444', // red
  '#10b981', // green
  '#f59e0b', // amber
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#6366f1', // indigo
  '#14b8a6', // teal
  '#f97316', // orange
  '#64748b', // slate
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
  return category ? category.color : FALLBACK_COLORS[0]; // Default blue if not found
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

export default function CategoryPieChart() {
  const { selectedMonth } = useMonthContext();
  const { transactions } = useTransactionContext();
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);
  const [categories, setCategories] = useState(getStoredCategories());

  // Load categories when component mounts
  useEffect(() => {
    setCategories(getStoredCategories());
    
    // Listen for changes to localStorage
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
    
    // If the selected month is after March 2025, show zero values for all categories
    if (selectedDate > march2025) {
      const zeroCategories = categories.map(cat => ({
        name: cat.name,
        value: 0,
        color: cat.color
      }));
      setChartData(zeroCategories);
      return;
    }
    
    // Filter transactions for the selected month
    const filteredTransactions = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getMonth() === monthIndex && transactionDate.getFullYear() === year;
    });
    
    // If no transactions for the selected month, use random data for months before March 2025
    if (filteredTransactions.length === 0 && selectedDate < march2025) {
      const randomCategories = categories.map(cat => ({
        name: cat.name,
        value: Math.floor(Math.random() * 200) + 50,
        color: cat.color
      }));
      setChartData(randomCategories);
      return;
    }
    
    // Group transactions by category
    const groupedData = groupByCategory(filteredTransactions);
    
    // Convert to chart data format and add color information
    const formattedData = Object.entries(groupedData).map(([category, value]) => {
      const categoryColor = getCategoryColor(category, categories);
      return {
        name: category,
        value,
        color: categoryColor
      };
    });
    
    setChartData(formattedData);
  }, [selectedMonth, transactions, categories]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-white shadow rounded-md dark:bg-gray-800 dark:text-gray-200">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-blue-600 dark:text-blue-400">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          animationDuration={1500}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || FALLBACK_COLORS[index % FALLBACK_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          layout="vertical" 
          verticalAlign="middle" 
          align="right"
          wrapperStyle={{ fontSize: '12px' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
} 