'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MonthContextType {
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
}

export const MonthContext = createContext<MonthContextType>({
  selectedMonth: '',
  setSelectedMonth: () => {},
});

export const useMonthContext = () => {
  const context = useContext(MonthContext);
  if (!context) {
    throw new Error('useMonthContext must be used within a MonthProvider');
  }
  return context;
};

export const MonthProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('');

  return (
    <MonthContext.Provider value={{ selectedMonth, setSelectedMonth }}>
      {children}
    </MonthContext.Provider>
  );
}; 