'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Something went wrong
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            We apologize for the inconvenience. Our team has been notified of this issue.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <button
            onClick={() => reset()}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Try again
          </button>
          <Link href="/" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            Return to home page
          </Link>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/30 rounded-md text-left">
            <p className="text-sm font-medium text-red-800 dark:text-red-300">Error details (only visible in development):</p>
            <pre className="mt-2 text-xs text-red-700 dark:text-red-400 overflow-auto">
              {error.message}
              {'\n'}
              {error.stack}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
} 