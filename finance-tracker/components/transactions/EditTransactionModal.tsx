'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define the form schema
const transactionSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  date: z.string().nonempty('Date is required'),
  description: z.string().nonempty('Description is required'),
  category: z.string().nonempty('Category is required'),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

// Mock categories
const categories = [
  'Food',
  'Transportation',
  'Entertainment',
  'Utilities',
  'Housing',
  'Healthcare',
  'Personal',
  'Education',
  'Shopping',
  'Other',
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

type Transaction = {
  id: string;
  amount: number;
  date: Date;
  description: string;
  category: string;
};

interface EditTransactionModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, data: Omit<TransactionFormData, 'id'>) => void;
}

export default function EditTransactionModal({
  transaction,
  isOpen,
  onClose,
  onSave,
}: EditTransactionModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: transaction
      ? {
          amount: transaction.amount,
          date: new Date(transaction.date).toISOString().split('T')[0],
          description: transaction.description,
          category: transaction.category,
        }
      : {
          amount: undefined,
          date: new Date().toISOString().split('T')[0],
          description: '',
          category: '',
        },
  });

  // Reset form when transaction changes
  useEffect(() => {
    if (transaction) {
      reset({
        amount: transaction.amount,
        date: new Date(transaction.date).toISOString().split('T')[0],
        description: transaction.description,
        category: transaction.category,
      });
    }
  }, [transaction, reset]);

  const onSubmit = async (data: TransactionFormData) => {
    if (!transaction) return;
    
    setIsSubmitting(true);
    try {
      await onSave(transaction.id, {
        ...data,
        amount: Number(data.amount),
      });
      onClose();
    } catch (error) {
      console.error('Error updating transaction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Edit Transaction</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="edit-amount" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Amount
            </label>
            <input
              id="edit-amount"
              type="number"
              step="0.01"
              className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                errors.amount ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
              }`}
              {...register('amount', { valueAsNumber: true })}
            />
            {errors.amount && (
              <p className="mt-1 text-xs text-red-500">{errors.amount.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="edit-date" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Date
            </label>
            <input
              id="edit-date"
              type="date"
              className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                errors.date ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
              }`}
              {...register('date')}
            />
            {errors.date && (
              <p className="mt-1 text-xs text-red-500">{errors.date.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="edit-description" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <input
              id="edit-description"
              type="text"
              className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                errors.description ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
              }`}
              {...register('description')}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="edit-category" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              id="edit-category"
              className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                errors.category ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
              }`}
              {...register('category')}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option 
                  key={category.id} 
                  value={category.name}
                  style={{ 
                    backgroundColor: category.color + '20',
                    color: category.color,
                  }}
                >
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>
            )}
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 