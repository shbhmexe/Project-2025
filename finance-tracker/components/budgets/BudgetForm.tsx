'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateId } from '@/lib/utils';

// Define the form schema
const budgetSchema = z.object({
  category: z.string().nonempty('Category is required'),
  amount: z.number().positive('Amount must be positive'),
  period: z.string().nonempty('Period is required'),
});

type BudgetFormData = z.infer<typeof budgetSchema>;

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
  'Coding',
  'Gaming',
  'Traveling',
  'Investing',
  'Saving',
  'Other',
];

// Budget periods
const periods = ['Weekly', 'Monthly', 'Quarterly', 'Yearly'];

export default function BudgetForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BudgetFormData>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      category: '',
      amount: undefined,
      period: 'Monthly',
    },
  });

  const onSubmit = async (data: BudgetFormData) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      console.log('Submitting budget:', {
        id: generateId(),
        ...data,
        amount: Number(data.amount),
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
      console.error('Error submitting budget:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {submitSuccess && (
        <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-md dark:bg-green-900/20 dark:text-green-300">
          Budget set successfully!
        </div>
      )}
      
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
      
      <div>
        <label htmlFor="amount" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Budget Amount
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
        <label htmlFor="period" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Budget Period
        </label>
        <select
          id="period"
          className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
            errors.period ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
          }`}
          {...register('period')}
        >
          {periods.map((period) => (
            <option key={period} value={period}>
              {period}
            </option>
          ))}
        </select>
        {errors.period && (
          <p className="mt-1 text-xs text-red-500">{errors.period.message}</p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Setting...' : 'Set Budget'}
      </button>
    </form>
  );
} 