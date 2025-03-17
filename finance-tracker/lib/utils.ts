/**
 * Format a number as currency
 */
export function formatCurrency(amount: number): string {
  if (typeof window !== 'undefined') {
    const currency = localStorage.getItem('currency') || 'USD';
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }
  
  // Default to USD if running on server
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

/**
 * Format a date to a string
 */
export function format(transaction: any) {
  const date = new Date(transaction.date);
  const monthYear = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
  }).format(date);
  
  return monthYear;
}

/**
 * Get the current month and year
 */
export function getCurrentMonthYear(): string {
  const now = new Date();
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
  }).format(now);
}

/**
 * Generate a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Calculate the total amount from an array of transactions
 */
export function calculateTotal(transactions: { amount: number }[]): number {
  return transactions.reduce((total, transaction) => total + transaction.amount, 0);
}

/**
 * Group transactions by category
 */
export function groupByCategory(transactions: { category: string; amount: number }[]): Record<string, number> {
  return transactions.reduce((groups, transaction) => {
    const { category, amount } = transaction;
    if (!groups[category]) {
      groups[category] = 0;
    }
    groups[category] += amount;
    return groups;
  }, {} as Record<string, number>);
}

/**
 * Group transactions by month
 */
export function groupByMonth(transactions: { date: Date; amount: number }[]): Record<string, number> {
  return transactions.reduce((groups, transaction) => {
    const monthYear = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
    }).format(transaction.date);
    
    if (!groups[monthYear]) {
      groups[monthYear] = 0;
    }
    groups[monthYear] += transaction.amount;
    return groups;
  }, {} as Record<string, number>);
}

/**
 * Format a date as a string for display
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
} 