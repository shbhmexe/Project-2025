'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { getCurrentMonthYear } from '@/lib/utils';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function SettingsPage() {
  const [theme, setTheme] = useState('light');
  const [currency, setCurrency] = useState('USD');
  const [dataExportFormat, setDataExportFormat] = useState('json');
  const [exportStatus, setExportStatus] = useState('');
  const [importStatus, setImportStatus] = useState('');
  const [resetStatus, setResetStatus] = useState('');
  
  // Load settings from localStorage on initial render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check for theme preference
      const storedTheme = localStorage.getItem('theme') || 'light';
      setTheme(storedTheme);
      
      // Apply theme to document
      if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Check for currency preference
      const storedCurrency = localStorage.getItem('currency') || 'USD';
      setCurrency(storedCurrency);
    }
  }, []);
  
  // Handle theme change
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  // Handle currency change
  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem('currency', newCurrency);
  };
  
  // Export data
  const handleExportData = () => {
    try {
      const transactions = localStorage.getItem('transactions') || '[]';
      const categories = localStorage.getItem('categories') || '[]';
      const budgets = localStorage.getItem('budgets') || '[]';
      
      const exportData = {
        transactions: JSON.parse(transactions),
        categories: JSON.parse(categories),
        budgets: JSON.parse(budgets),
        exportDate: new Date().toISOString(),
        version: '1.0'
      };
      
      // Create download link
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      
      const exportFileDefaultName = `finance-tracker-export-${new Date().toISOString().slice(0, 10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      setExportStatus('Data exported successfully!');
      setTimeout(() => setExportStatus(''), 3000);
    } catch (error) {
      console.error('Error exporting data:', error);
      setExportStatus('Error exporting data. Please try again.');
      setTimeout(() => setExportStatus(''), 3000);
    }
  };
  
  // Import data
  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        
        // Validate imported data
        if (!importedData.transactions || !importedData.categories || !importedData.budgets) {
          throw new Error('Invalid data format');
        }
        
        // Store imported data
        localStorage.setItem('transactions', JSON.stringify(importedData.transactions));
        localStorage.setItem('categories', JSON.stringify(importedData.categories));
        localStorage.setItem('budgets', JSON.stringify(importedData.budgets));
        
        setImportStatus('Data imported successfully! Please refresh the page to see changes.');
        setTimeout(() => setImportStatus(''), 5000);
      } catch (error) {
        console.error('Error importing data:', error);
        setImportStatus('Error importing data. Please check the file format.');
        setTimeout(() => setImportStatus(''), 3000);
      }
    };
    reader.readAsText(file);
    
    // Reset the file input
    event.target.value = null;
  };
  
  // Reset all data
  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      try {
        localStorage.removeItem('transactions');
        localStorage.removeItem('categories');
        localStorage.removeItem('budgets');
        
        setResetStatus('All data has been reset. Please refresh the page.');
        setTimeout(() => setResetStatus(''), 5000);
      } catch (error) {
        console.error('Error resetting data:', error);
        setResetStatus('Error resetting data. Please try again.');
        setTimeout(() => setResetStatus(''), 3000);
      }
    }
  };
  
  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Settings</h1>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Appearance Settings */}
          <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Appearance</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Theme</label>
              <div className="flex space-x-4">
                <button
                  className={`px-4 py-2 rounded-lg ${
                    theme === 'light'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => handleThemeChange('light')}
                >
                  Light
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${
                    theme === 'dark'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => handleThemeChange('dark')}
                >
                  Dark
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Currency</label>
              <select
                className="w-full md:w-auto p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                value={currency}
                onChange={(e) => handleCurrencyChange(e.target.value)}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
                <option value="CAD">CAD (C$)</option>
                <option value="AUD">AUD (A$)</option>
                <option value="INR">INR (₹)</option>
              </select>
            </div>
          </div>
          
          {/* Data Management */}
          <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Data Management</h2>
            
            <div className="mb-6">
              <h3 className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">Export Data</h3>
              <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                Download all your financial data for backup or transfer to another device.
              </p>
              <div className="flex items-center space-x-4">
                <select
                  className="p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  value={dataExportFormat}
                  onChange={(e) => setDataExportFormat(e.target.value)}
                >
                  <option value="json">JSON</option>
                </select>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={handleExportData}
                >
                  Export
                </button>
              </div>
              {exportStatus && (
                <p className="mt-2 text-sm text-green-500">{exportStatus}</p>
              )}
            </div>
            
            <div className="mb-6">
              <h3 className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">Import Data</h3>
              <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                Import your financial data from a backup file.
              </p>
              <div>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-300"
                />
              </div>
              {importStatus && (
                <p className="mt-2 text-sm text-green-500">{importStatus}</p>
              )}
            </div>
            
            <div>
              <h3 className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">Reset Data</h3>
              <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                Delete all your financial data and start fresh. This action cannot be undone.
              </p>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleResetData}
              >
                Reset All Data
              </button>
              {resetStatus && (
                <p className="mt-2 text-sm text-green-500">{resetStatus}</p>
              )}
            </div>
          </div>
          
          {/* About */}
          <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">About</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Finance Tracker v1.0.0
            </p>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              A personal finance management application to help you track your income, expenses, and budget.
            </p>
            <p className="mt-4 text-gray-700 dark:text-gray-300 font-medium">Made by Shubham Shukla</p>
            
            <div className="mt-3 flex space-x-4">
              <a 
                href="https://github.com/shbhmexe" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a 
                href="https://www.linkedin.com/in/shubham-shukla-62095032a/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://www.instagram.com/shbhm.exe/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-300 transition-colors"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 