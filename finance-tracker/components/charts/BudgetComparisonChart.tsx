'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/lib/utils';

// Mock data for budgets and actual spending
const mockBudgetData = [
  { category: 'Food', budget: 300, actual: 250 },
  { category: 'Transportation', budget: 150, actual: 180 },
  { category: 'Entertainment', budget: 100, actual: 120 },
  { category: 'Utilities', budget: 200, actual: 190 },
  { category: 'Housing', budget: 800, actual: 800 },
  { category: 'Shopping', budget: 150, actual: 210 },
  { category: 'Healthcare', budget: 100, actual: 50 },
];

export default function BudgetComparisonChart() {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Sort by budget amount (descending)
    const sortedData = [...mockBudgetData].sort((a, b) => b.budget - a.budget);
    setChartData(sortedData);
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-white shadow rounded-md dark:bg-gray-800 dark:text-gray-200">
          <p className="font-semibold">{label}</p>
          <p className="text-blue-600 dark:text-blue-400">
            Budget: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-green-600 dark:text-green-400">
            Actual: {formatCurrency(payload[1].value)}
          </p>
          <p className={`${
            payload[1].value > payload[0].value 
              ? 'text-red-500 dark:text-red-400' 
              : 'text-green-500 dark:text-green-400'
          }`}>
            {payload[1].value > payload[0].value 
              ? `Over by ${formatCurrency(payload[1].value - payload[0].value)}` 
              : `Under by ${formatCurrency(payload[0].value - payload[1].value)}`}
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
        margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
        barGap={0}
        barSize={20}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="category" 
          tick={{ fontSize: 12 }}
          tickMargin={10}
        />
        <YAxis 
          tickFormatter={(value) => `$${value}`}
          tick={{ fontSize: 12 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: '12px' }} />
        <Bar 
          name="Budget" 
          dataKey="budget" 
          fill="#3b82f6" 
          radius={[4, 4, 0, 0]}
          animationDuration={1500}
        />
        <Bar 
          name="Actual" 
          dataKey="actual" 
          fill="#10b981" 
          radius={[4, 4, 0, 0]}
          animationDuration={1500}
        />
      </BarChart>
    </ResponsiveContainer>
  );
} 