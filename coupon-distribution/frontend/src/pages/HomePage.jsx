import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="text-center px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-brand-primary transition-all duration-300 hover:text-opacity-80">
        Round-Robin Coupon Distribution
      </h1>
      
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8 space-y-6 transform transition-all duration-300 hover:shadow-xl">
        <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
          Welcome to our Coupon Distribution System! This platform allows guests to claim coupons 
          with built-in mechanisms to prevent abuse and ensure fair distribution.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-brand-background p-4 sm:p-6 rounded-md shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-brand-primary bg-opacity-20 rounded-full flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-brand-primary mb-2 text-lg">Fair Distribution</h3>
              <p className="text-sm text-gray-600 text-center">
                Coupons are assigned sequentially to ensure equal opportunity.
              </p>
            </div>
          </div>
          
          <div className="bg-brand-background p-4 sm:p-6 rounded-md shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-brand-primary bg-opacity-20 rounded-full flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-brand-primary mb-2 text-lg">Abuse Prevention</h3>
              <p className="text-sm text-gray-600 text-center">
                IP and cookie tracking prevent multiple claims from the same source.
              </p>
            </div>
          </div>
          
          <div className="bg-brand-background p-4 sm:p-6 rounded-md shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md sm:col-span-2 lg:col-span-1 sm:mx-auto lg:mx-0">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-brand-primary bg-opacity-20 rounded-full flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-brand-primary mb-2 text-lg">Guest Access</h3>
              <p className="text-sm text-gray-600 text-center">
                No login required - simple and straightforward coupon claiming.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 mb-4">
          <Link 
            to="/coupons" 
            className="inline-block bg-brand-secondary text-white px-6 py-3 rounded-md hover:bg-green-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            View Available Coupons
          </Link>
        </div>
      </div>
      
      <div className="mt-8 text-sm text-gray-500">
        Powered by modern web technologies for a seamless experience
      </div>
    </div>
  );
}

export default HomePage; 