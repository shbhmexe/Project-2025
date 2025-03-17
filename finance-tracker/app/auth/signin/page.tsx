'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      // Mock login that always succeeds
      await signIn('credentials', { 
        username: 'demo', 
        password: 'password', 
        redirect: false 
      });
      
      // Always redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Sign-in error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            {isLoading ? 'Signing you in...' : 'Sign In'}
          </h1>
          <p className="mt-2 text-gray-600">
            {isLoading 
              ? 'Connecting. You\'ll be redirected to the dashboard shortly.' 
              : 'Click to sign in to your dashboard'}
          </p>
        </div>
        
        {isLoading && (
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        <div className="space-y-4 mt-8">
          <button
            onClick={handleSignIn}
            disabled={isLoading}
            className="flex items-center justify-center w-full px-4 py-3 space-x-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          >
            {isLoading ? 'Signing In...' : 'Sign In to Dashboard'}
          </button>
        </div>
      </div>
    </div>
  );
} 