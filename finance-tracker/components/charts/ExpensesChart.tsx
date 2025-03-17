'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency, groupByMonth, getCurrentMonthYear } from '@/lib/utils';
import { useTransactionContext } from '@/app/dashboard/page';

// Create a context for the selected month
export const MonthContext = createContext<{
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
}>({
  selectedMonth: getCurrentMonthYear(),
  setSelectedMonth: () => {},
});

// Hook to use the month context
export const useMonthContext = () => useContext(MonthContext);

// Mock data for transactions
const mockTransactions = [
  { id: '1', amount: 120.50, date: new Date('2024-01-15'), description: 'Grocery shopping', category: 'Food' },
  { id: '2', amount: 45.00, date: new Date('2024-01-22'), description: 'Gas station', category: 'Transportation' },
  { id: '3', amount: 9.99, date: new Date('2024-02-03'), description: 'Netflix subscription', category: 'Entertainment' },
  { id: '4', amount: 200.00, date: new Date('2024-02-15'), description: 'Electricity bill', category: 'Utilities' },
  { id: '5', amount: 60.00, date: new Date('2024-03-10'), description: 'Dinner with friends', category: 'Food' },
  { id: '6', amount: 80.00, date: new Date('2024-03-20'), description: 'Clothing', category: 'Shopping' },
  { id: '7', amount: 150.00, date: new Date('2024-04-05'), description: 'Internet bill', category: 'Utilities' },
  { id: '8', amount: 35.00, date: new Date('2024-04-15'), description: 'Books', category: 'Education' },
  { id: '9', amount: 90.00, date: new Date('2024-05-01'), description: 'Gym membership', category: 'Health' },
  { id: '10', amount: 65.00, date: new Date('2024-05-20'), description: 'Restaurant', category: 'Food' },
  { id: '11', amount: 120.00, date: new Date('2024-06-10'), description: 'Phone bill', category: 'Utilities' },
  { id: '12', amount: 200.00, date: new Date('2024-06-25'), description: 'Concert tickets', category: 'Entertainment' },
  { id: '13', amount: 175.50, date: new Date('2025-01-05'), description: 'New headphones', category: 'Shopping' },
  { id: '14', amount: 95.00, date: new Date('2025-02-10'), description: 'Dinner date', category: 'Food' },
  { id: '15', amount: 85.75, date: new Date('2025-03-01'), description: 'Grocery shopping', category: 'Food' },
  { id: '16', amount: 0, date: new Date('2025-04-01'), description: 'No expenses', category: 'Utilities' },
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

export default function ExpensesChart() {
  const { selectedMonth } = useMonthContext();
  const { transactions } = useTransactionContext();
  const [chartData, setChartData] = useState<{ name: string; amount: number }[]>([]);

  useEffect(() => {
    // Parse the selected month and year
    const [selectedMonthName, selectedYear] = selectedMonth.split(' ');
    const selectedDate = new Date(`${selectedMonthName} 1, ${selectedYear}`);
    const march2025 = new Date('March 1, 2025');
    
    // Group transactions by month
    const groupedData = groupByMonth(transactions);
    
    // Convert to chart data format
    let formattedData = Object.entries(groupedData).map(([month, amount]) => {
      const [monthName, yearStr] = month.split(' ');
      const monthDate = new Date(`${monthName} 1, ${yearStr}`);
      
      // If the month is after March 2025, set amount to 0
      if (monthDate > march2025) {
        return {
          name: month,
          amount: 0,
        };
      }
      
      return {
        name: month,
        amount,
      };
    });
    
    // Sort by date
    formattedData.sort((a, b) => {
      const dateA = new Date(a.name);
      const dateB = new Date(b.name);
      return dateA.getTime() - dateB.getTime();
    });
    
    // Add months with zero values if they don't exist
    const allMonths = [];
    for (let year = 2024; year <= 2025; year++) {
      for (let month = 0; month < 12; month++) {
        const date = new Date(year, month, 1);
        const monthYear = new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
        }).format(date);
        
        // Check if this month exists in our data
        if (!formattedData.some(item => item.name === monthYear)) {
          // If month is after March 2025, add with zero amount
          if (date > march2025) {
            allMonths.push({
              name: monthYear,
              amount: 0,
            });
          } else {
            // For months before March 2025, add with random amount between 50-200
            allMonths.push({
              name: monthYear,
              amount: Math.floor(Math.random() * 150) + 50,
            });
          }
        }
      }
    }
    
    // Merge existing data with added months
    formattedData = formattedData.filter(item => {
      const itemDate = new Date(item.name);
      return itemDate <= march2025;
    });
    
    formattedData = [...formattedData, ...allMonths];
    
    // Sort again to ensure proper order
    formattedData.sort((a, b) => {
      const dateA = new Date(a.name);
      const dateB = new Date(b.name);
      return dateA.getTime() - dateB.getTime();
    });
    
    setChartData(formattedData);
  }, [selectedMonth, transactions]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-white shadow rounded-md dark:bg-gray-800 dark:text-gray-200">
          <p className="font-semibold">{label}</p>
          <p className="text-blue-600 dark:text-blue-400">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12 }}
          tickMargin={10}
        />
        <YAxis 
          tickFormatter={(value) => `$${value}`}
          tick={{ fontSize: 12 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="amount" 
          fill="#3b82f6" 
          radius={[4, 4, 0, 0]}
          animationDuration={1500}
          minPointSize={1}
        />
      </BarChart>
    </ResponsiveContainer>
  );
} 