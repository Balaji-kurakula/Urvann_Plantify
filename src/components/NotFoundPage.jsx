import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-6">🌿</div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
      <p className="text-xl text-gray-600 mb-8">
        Oops! The page you're looking for seems to have wandered off into the garden.
      </p>
      <div className="space-x-4">
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Back to Plant Store
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
