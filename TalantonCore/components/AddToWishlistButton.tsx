'use client';

import { useState } from 'react';

interface AddToWishlistButtonProps {
  productId: string;
  productName: string;
}

export default function AddToWishlistButton({ productId, productName }: AddToWishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    setIsInWishlist(!isInWishlist);
    setShowTooltip(true);
    
    // Hide tooltip after 2 seconds
    setTimeout(() => {
      setShowTooltip(false);
    }, 2000);

    // In a real app, this would make an API call to save to wishlist
    console.log(`${isInWishlist ? 'Removed from' : 'Added to'} wishlist:`, productName);
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={`p-2 rounded-full transition-all duration-200 ${
          isInWishlist
            ? 'bg-red-100 text-red-600 hover:bg-red-200'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isInWishlist ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button>
      
      {showTooltip && (
        <div className="absolute top-full mt-2 right-0 bg-gray-900 text-white text-xs px-3 py-1 rounded shadow-lg whitespace-nowrap z-10 animate-fade-in">
          {isInWishlist ? 'Added to wishlist!' : 'Removed from wishlist'}
        </div>
      )}
    </div>
  );
}
