'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { getCurrentMonthYear } from '@/lib/utils';

// Define the context type
interface MonthContextType {
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
}

// Create the context with default values
export const MonthContext = createContext<MonthContextType>({
  selectedMonth: getCurrentMonthYear(),
  setSelectedMonth: () => {},
});

// Create a hook to use the context
export const useMonthContext = () => useContext(MonthContext);

// Provider component for wrapping application parts that need this context
export function MonthProvider({ children }: { children: ReactNode }) {
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthYear());
  
  return (
    <MonthContext.Provider value={{ selectedMonth, setSelectedMonth }}>
      {children}
    </MonthContext.Provider>
  );
} 