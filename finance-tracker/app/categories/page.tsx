'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useMonthContext } from '@/contexts/MonthContext';
import { useTransactionContext } from '@/app/contexts/TransactionContext';
import { getCurrentMonthYear } from '@/lib/utils';

// Explicitly define interfaces with full type safety
interface Category {
  id: string;
  name: string;
  color: string;
}

interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string | Date;
}

// Default categories with explicit typing
const defaultCategories: Category[] = [
  { id: '1', name: 'Food', color: '#ef4444' },
  { id: '2', name: 'Utilities', color: '#3b82f6' },
  { id: '3', name: 'Shopping', color: '#10b981' },
  { id: '4', name: 'Transportation', color: '#f59e0b' },
  { id: '5', name: 'Entertainment', color: '#8b5cf6' },
];

// Safely get stored categories
const getStoredCategories = (): Category[] => {
  if (typeof window === 'undefined') return defaultCategories;
  
  try {
    const stored = localStorage.getItem('categories');
    return stored ? JSON.parse(stored) : defaultCategories;
  } catch (error) {
    console.error('Error parsing stored categories:', error);
    return defaultCategories;
  }
};

export default function CategoriesPage() {
  // Use context hooks with fallback values
  const { transactions = [] } = useTransactionContext();
  const { selectedMonth = getCurrentMonthYear(), setSelectedMonth } = useMonthContext();

  // State with explicit typing and initialization
  const [categories, setCategories] = useState<Category[]>(() => getStoredCategories());
  const [newCategory, setNewCategory] = useState({ 
    name: '', 
    color: '#3b82f6' 
  });
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Save categories to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('categories', JSON.stringify(categories));
      } catch (error) {
        console.error('Error saving categories:', error);
      }
    }
  }, [categories]);

  // Category management functions with type safety
  const handleAddCategory = () => {
    if (!newCategory.name.trim()) return;
    
    const newCat: Category = {
      id: Date.now().toString(),
      name: newCategory.name.trim(),
      color: newCategory.color,
    };
    
    setCategories(prev => [...prev, newCat]);
    setNewCategory({ name: '', color: '#3b82f6' });
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setNewCategory({ 
      name: category.name, 
      color: category.color 
    });
    setIsEditing(true);
  };

  const handleUpdateCategory = () => {
    if (!newCategory.name.trim() || !editingCategory) return;
    
    setCategories(prev => 
      prev.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, name: newCategory.name.trim(), color: newCategory.color } 
          : cat
      )
    );
    
    setNewCategory({ name: '', color: '#3b82f6' });
    setIsEditing(false);
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  const handleCancelEdit = () => {
    setNewCategory({ name: '', color: '#3b82f6' });
    setIsEditing(false);
    setEditingCategory(null);
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Categories</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-4">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Category List</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                    <tr>
                      <th className="px-4 py-3">Color</th>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr key={category.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-4 py-3">
                          <div 
                            className="w-6 h-6 rounded-full" 
                            style={{ backgroundColor: category.color }}
                          ></div>
                        </td>
                        <td className="px-4 py-3">{category.name}</td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <button 
                              className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                              onClick={() => handleEditCategory(category)}
                            >
                              Edit
                            </button>
                            <button 
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              onClick={() => handleDeleteCategory(category.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-4">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                {isEditing ? 'Edit Category' : 'Add Category'}
              </h2>
              
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Name</label>
                  <input
                    type="text"
                    placeholder="Enter category name"
                    className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Color</label>
                  <input
                    type="color"
                    className="w-full p-1 h-10 border rounded dark:bg-gray-800 dark:border-gray-600"
                    value={newCategory.color}
                    onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                  />
                </div>
                
                {isEditing ? (
                  <div className="flex space-x-2">
                    <button 
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={handleUpdateCategory}
                    >
                      Update Category
                    </button>
                    <button 
                      className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button 
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleAddCategory}
                  >
                    Add Category
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 