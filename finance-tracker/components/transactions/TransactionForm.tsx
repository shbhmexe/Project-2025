'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateId } from '@/lib/utils';

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

export default function TransactionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: undefined,
      date: new Date().toISOString().split('T')[0],
      description: '',
      category: '',
    },
  });

  const onSubmit = async (data: TransactionFormData) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      console.log('Submitting transaction:', {
        id: generateId(),
        ...data,
        amount: Number(data.amount),
        date: new Date(data.date),
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Show success message and reset form
      setSubmitSuccess(true);
      reset();
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting transaction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {submitSuccess && (
        <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-md dark:bg-green-900/20 dark:text-green-300">
          Transaction added successfully!
        </div>
      )}
      
      <div>
        <label htmlFor="amount" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Amount
        </label>
        <input
          id="amount"
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
        <label htmlFor="date" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Date
        </label>
        <input
          id="date"
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
        <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <input
          id="description"
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
        <label htmlFor="category" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Category
        </label>
        <select
          id="category"
          className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
            errors.category ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
          }`}
          {...register('category')}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Adding...' : 'Add Transaction'}
      </button>
    </form>
  );
} 