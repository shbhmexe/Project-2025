/**
 * Format a number as currency
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

/**
 * Format a date to a string
 */
export function format(transaction: any) {
  try {
    // Handle cases where date might be invalid
    if (!transaction || !transaction.date) {
      return 'Invalid date';
    }
    
    const date = new Date(transaction.date);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    
    const monthYear = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
    }).format(date);
    
    return monthYear;
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
}

/**
 * Get the current month and year
 */
export function getCurrentMonthYear(): string {
  const date = new Date();
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
  }).format(date);
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
export function groupByMonth(transactions: any[]): Record<string, number> {
  if (!transactions || !Array.isArray(transactions)) {
    return {};
  }
  
  return transactions.reduce((groups, transaction) => {
    try {
      if (!transaction || !transaction.date || !transaction.amount) {
        return groups;
      }
      
      const date = new Date(transaction.date);
      
      // Skip invalid dates
      if (isNaN(date.getTime())) {
        return groups;
      }
      
      const monthYear = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
      }).format(date);
      
      if (!groups[monthYear]) {
        groups[monthYear] = 0;
      }
      groups[monthYear] += transaction.amount;
      return groups;
    } catch (error) {
      console.error('Error in groupByMonth:', error);
      return groups;
    }
  }, {} as Record<string, number>);
}

/**
 * Filter transactions by month
 */
export function filterByMonth(transactions: any[], monthStr: string): any[] {
  if (!transactions || !Array.isArray(transactions) || !monthStr) {
    return transactions;
  }

  try {
    const parts = monthStr.split(' ');
    if (parts.length !== 2) return transactions;

    const monthName = parts[0];
    const year = parseInt(parts[1], 10);

    if (isNaN(year)) return transactions;

    const monthMap: Record<string, number> = {
      'Jan': 0, 'January': 0,
      'Feb': 1, 'February': 1,
      'Mar': 2, 'March': 2,
      'Apr': 3, 'April': 3,
      'May': 4,
      'Jun': 5, 'June': 5,
      'Jul': 6, 'July': 6,
      'Aug': 7, 'August': 7,
      'Sep': 8, 'September': 8,
      'Oct': 9, 'October': 9,
      'Nov': 10, 'November': 10,
      'Dec': 11, 'December': 11
    };

    const monthIndex = monthMap[monthName];
    if (monthIndex === undefined) return transactions;

    return transactions.filter(transaction => {
      try {
        const date = new Date(transaction.date);
        return date.getMonth() === monthIndex && date.getFullYear() === year;
      } catch {
        return false;
      }
    });
  } catch {
    return transactions;
  }
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

// Add this error handling wrapper to critical functions
export function safeParseJSON<T>(value: string | null, defaultValue: T): T {
  try {
    return value ? JSON.parse(value) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function safeParseTransactions(stored: string | null): Transaction[] {
  if (!stored) return [];
  
  try {
    return JSON.parse(stored).map((t: any) => ({
      ...t,
      date: new Date(t.date)
    }));
  } catch (error) {
    console.error('Error parsing transactions:', error);
    return [];
  }
} 