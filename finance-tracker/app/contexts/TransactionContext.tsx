'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: Date | string;
}

interface TransactionContextType {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;
}

export const TransactionContext = createContext<TransactionContextType>({
  transactions: [],
  setTransactions: () => {},
  addTransaction: () => {},
  removeTransaction: () => {},
});

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('transactions');
        if (stored) {
          setTransactions(JSON.parse(stored));
        }
      } catch {}
    }
  }, []);

  const addTransaction = useCallback((transaction: Transaction) => {
    setTransactions(prev => [...prev, transaction]);
  }, []);

  const removeTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('transactions', JSON.stringify(transactions));
      } catch {}
    }
  }, [transactions]);

  return (
    <TransactionContext.Provider 
      value={{ 
        transactions, 
        setTransactions, 
        addTransaction, 
        removeTransaction 
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactionContext must be used within a TransactionProvider');
  }
  return context;
}; 