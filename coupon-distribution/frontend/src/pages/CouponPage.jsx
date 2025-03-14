import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CouponPage() {
  const [coupons, setCoupons] = useState([]);
  const [claimedCoupon, setClaimedCoupon] = useState(null);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);

  // Use environment variable for API base URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

  useEffect(() => {
    // Generate or retrieve session ID
    let currentSessionId = sessionStorage.getItem('sessionId');
    if (!currentSessionId) {
      currentSessionId = crypto.randomUUID();
      sessionStorage.setItem('sessionId', currentSessionId);
    }
    setSessionId(currentSessionId);

    // Check if a coupon has been claimed in this session
    const sessionClaimedCoupon = sessionStorage.getItem('claimedCoupon');
    if (sessionClaimedCoupon) {
      setClaimedCoupon(JSON.parse(sessionClaimedCoupon));
    }

    // Check for cooldown
    const lastClaimTime = sessionStorage.getItem('lastClaimTime');
    if (lastClaimTime) {
      const timeLeft = Math.ceil((parseInt(lastClaimTime) + 10000 - Date.now()) / 1000);
      if (timeLeft > 0) {
        setCooldownTime(timeLeft);
      } else {
        // If cooldown is over, clear the claimed coupon
        setClaimedCoupon(null);
        sessionStorage.removeItem('claimedCoupon');
      }
    }

    // Fetch available coupons
    fetchCoupons();
  }, []);

  useEffect(() => {
    let timer;
    if (cooldownTime > 0) {
      timer = setInterval(() => {
        setCooldownTime(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            // Reset claimed coupon state when cooldown ends
            setClaimedCoupon(null);
            sessionStorage.removeItem('claimedCoupon');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldownTime]);

  const fetchCoupons = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/coupons`);
      setCoupons(response.data);
    } catch (err) {
      console.error('Failed to fetch coupons:', err);
      // Fallback mock coupons for demonstration
      setCoupons([
        { id: 1, code: 'SUMMER20', discount: '20% Off', description: 'Summer Sale Discount' },
        { id: 2, code: 'WELCOME10', discount: '10% Off', description: 'New User Discount' },
        { id: 3, code: 'FREESHIP', discount: 'Free Shipping', description: 'Free Shipping Coupon' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClaimCoupon = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/claim-coupon`, {}, {
        headers: {
          'X-Session-Id': sessionId
        }
      });
      const coupon = response.data;
      
      setClaimedCoupon(coupon);
      sessionStorage.setItem('claimedCoupon', JSON.stringify(coupon));
      sessionStorage.setItem('lastClaimTime', Date.now().toString());
      setCooldownTime(10);
      setError(null);
    } catch (err) {
      if (err.response?.data?.timeLeft) {
        setCooldownTime(err.response.data.timeLeft);
      }
      setError(err.response?.data?.message || 'Unable to claim coupon. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center text-brand-primary">
        {import.meta.env.VITE_APP_NAME || 'Available Coupons'}
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6 shadow-sm" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {claimedCoupon ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-5 rounded-lg relative mb-6 shadow-sm transform transition-all duration-300 hover:shadow-md">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div>
              <strong className="font-bold text-lg">Congratulations!</strong> 
              <p className="my-1">You've claimed the coupon:</p>
              <div className="bg-white px-4 py-2 rounded-md border border-green-300 inline-block mt-2 font-mono">
                {claimedCoupon.code}
              </div>
              <p className="text-sm mt-2">{claimedCoupon.description}</p>
              {cooldownTime > 0 && (
                <p className="text-sm mt-2 text-green-600">
                  Claim again in {cooldownTime} seconds...
                </p>
              )}
            </div>
            <div className="mt-4 sm:mt-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mb-8">
          <button 
            onClick={handleClaimCoupon}
            disabled={isLoading || cooldownTime > 0}
            className={`bg-brand-secondary text-white px-6 py-3 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${(isLoading || cooldownTime > 0) ? 'opacity-70 cursor-not-allowed' : 'hover:bg-green-600'}`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : cooldownTime > 0 ? (
              `Wait ${cooldownTime}s`
            ) : 'Claim a Coupon'}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {isLoading && !coupons.length ? (
          Array(3).fill(0).map((_, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6 mb-3"></div>
              <div className="h-2 bg-gray-200 rounded w-1/4 mt-4"></div>
            </div>
          ))
        ) : (
          coupons.map((coupon) => (
            <div 
              key={coupon._id || coupon.id} 
              className="bg-white shadow-md rounded-lg p-6 text-center transform transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-brand-primary mb-2">
                    {coupon.code}
                  </h3>
                  <div className="bg-brand-background inline-block px-3 py-1 rounded-full text-sm font-medium text-brand-primary mb-3">
                    {coupon.discount}
                  </div>
                  <p className="text-gray-600 mb-4">{coupon.description}</p>
                </div>
                <div className="mt-auto">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-brand-secondary h-2.5 rounded-full" 
                      style={{ width: `${((coupon.currentClaims || 0) / (coupon.claimLimit || 100)) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {coupon.currentClaims || 0}/{coupon.claimLimit || 'Unlimited'} Claims
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <p className="text-center text-gray-500 mt-8 text-sm">
        Version: {import.meta.env.VITE_APP_VERSION || '1.0.0'}
      </p>
    </div>
  );
}

export default CouponPage; 