'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  const handleGetStarted = () => {
    router.push('/auth/signin');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-6">Finance Tracker</h1>
        <p className="text-xl text-blue-100 mb-8 max-w-md mx-auto">
          Take control of your finances with our simple and effective tracking tool
        </p>
        <button
          onClick={handleGetStarted}
          className="px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
