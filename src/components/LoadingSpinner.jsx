import React from 'react';

const LoadingSpinner = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-green-600 ${sizeClasses[size]}`}></div>
    </div>
  );
};

export default LoadingSpinner;
