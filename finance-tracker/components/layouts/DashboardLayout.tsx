'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, CreditCardIcon, TagIcon, ChartPieIcon, DocumentChartBarIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

interface DashboardLayoutProps {
  children: ReactNode;
}

interface HeaderProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Transactions', path: '/transactions', icon: '💰' },
    { name: 'Categories', path: '/categories', icon: '🏷️' },
    { name: 'Budgets', path: '/budgets', icon: '🎯' },
    { name: 'Reports', path: '/reports', icon: '📈' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
  ];
  
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar for desktop */}
      <aside className="hidden w-64 bg-white border-r dark:bg-gray-800 dark:border-gray-700 md:block">
        <div className="flex items-center justify-center h-16 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Finance Tracker</h2>
        </div>
        <nav className="mt-5">
          <ul>
            {navItems.map((item) => (
              <li key={item.path} className="px-2 py-1">
                <Link 
                  href={item.path}
                  className={`flex items-center px-4 py-3 text-gray-600 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    pathname === item.path ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' : ''
                  }`}
                >
                  <span className="mr-3 text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      
      {/* Mobile sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Finance Tracker</h2>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <nav className="mt-5">
              <ul>
                {navItems.map((item) => (
                  <li key={item.path} className="px-2 py-1">
                    <Link 
                      href={item.path}
                      className={`flex items-center px-4 py-3 text-gray-600 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        pathname === item.path ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' : ''
                      }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <span className="mr-3 text-xl">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation */}
        <Header setIsSidebarOpen={setIsSidebarOpen} />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

function Header({ setIsSidebarOpen }: HeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    if (userMenuOpen) setUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
    if (notificationsOpen) setNotificationsOpen(false);
  };

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      {/* Mobile menu button */}
      <button 
        className="p-1 text-gray-500 rounded-md md:hidden hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        onClick={() => setIsSidebarOpen(true)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      {/* Search */}
      <div className="flex-1 max-w-md ml-4 md:ml-6">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
            type="text" 
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-transparent rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            placeholder="Search..." 
          />
        </div>
      </div>
      
      {/* User menu */}
      <div className="flex items-center">
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={toggleNotifications}
            className="p-1 mr-4 text-gray-500 rounded-md hover:text-gray-900 dark:text-gray-400 dark:hover:text-white relative"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {/* Notification badge */}
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* Notifications dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 z-10 w-80 mt-2 bg-white rounded-md shadow-lg dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
              <div className="py-2 px-4 border-b border-gray-100 dark:border-gray-600">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notifications</h3>
              </div>
              <div className="max-h-60 overflow-y-auto">
                <div className="py-2 px-4 border-b border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <p className="text-sm text-gray-700 dark:text-gray-300">You've exceeded your budget for Entertainment</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                </div>
                <div className="py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <p className="text-sm text-gray-700 dark:text-gray-300">New transaction added: Grocery shopping</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Yesterday</p>
                </div>
              </div>
              <div className="py-2 px-4 border-t border-gray-100 dark:border-gray-600">
                <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">View all notifications</a>
              </div>
            </div>
          )}
        </div>
        
        {/* User profile */}
        <div className="relative">
          <button 
            onClick={toggleUserMenu}
            className="flex items-center text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            <div className="w-8 h-8 mr-2 overflow-hidden text-white bg-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
              </svg>
            </div>
            <span className="hidden md:inline-block">User</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          {/* User dropdown */}
          {userMenuOpen && (
            <div className="absolute right-0 z-10 w-48 mt-2 bg-white rounded-md shadow-lg dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">Your Profile</a>
                <Link 
                  href="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Settings
                </Link>
                <a href="/" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">Sign out</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 