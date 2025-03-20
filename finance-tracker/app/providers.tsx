'use client';

import { ReactNode } from 'react';
import { MonthProvider } from '@/app/contexts/MonthContext';
import { TransactionProvider } from '@/app/contexts/TransactionContext';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <MonthProvider>
        <TransactionProvider>
          {children}
        </TransactionProvider>
      </MonthProvider>
    </SessionProvider>
  );
} 