'use client';

import { createContext, useContext } from 'react';

interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: Date;
}

interface TransactionContextType {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
}

export const TransactionContext = createContext<TransactionContextType>({
  transactions: [],
  setTransactions: () => {},
});

export const useTransactionContext = () => useContext(TransactionContext); 