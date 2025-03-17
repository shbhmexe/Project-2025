'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateId } from '@/lib/utils';

// Define the form schema
const categorySchema = z.object({
  name: z.string().nonempty('Category name is required'),
  color: z.string().nonempty('Color is required'),
  icon: z.string().nonempty('Icon is required'),
});

type CategoryFormData = z.infer<typeof categorySchema>;

// Predefined icons
const icons = ['🍔', '🚗', '🎬', '💡', '🏠', '🏥', '👤', '📚', '🛍️', '📌', '💰', '🎮', '✈️', '🎵', '🎁'];

export default function CategoryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      color: '#3b82f6',
      icon: '📌',
    },
  });

  const onSubmit = async (data: CategoryFormData) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      console.log('Submitting category:', {
        id: generateId(),
        ...data,
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
      console.error('Error submitting category:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {submitSuccess && (
        <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-md dark:bg-green-900/20 dark:text-green-300">
          Category added successfully!
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Category Name
        </label>
        <input
          id="name"
          type="text"
          className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
            errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
          }`}
          {...register('name')}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="color" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Color
        </label>
        <input
          id="color"
          type="color"
          className={`w-full h-10 px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
            errors.color ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
          }`}
          {...register('color')}
        />
        {errors.color && (
          <p className="mt-1 text-xs text-red-500">{errors.color.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="icon" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Icon
        </label>
        <select
          id="icon"
          className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
            errors.icon ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
          }`}
          {...register('icon')}
        >
          {icons.map((icon) => (
            <option key={icon} value={icon}>
              {icon} {icon === '🍔' ? '- Food' : icon === '🚗' ? '- Transportation' : ''}
            </option>
          ))}
        </select>
        {errors.icon && (
          <p className="mt-1 text-xs text-red-500">{errors.icon.message}</p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Adding...' : 'Add Category'}
      </button>
    </form>
  );
} 