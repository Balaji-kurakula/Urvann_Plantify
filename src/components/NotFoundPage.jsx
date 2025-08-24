import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      {/* Animated Icon */}
      <motion.div
        className="text-7xl mb-6"
        animate={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        🌿
      </motion.div>

      {/* Heading */}
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        404 - Page Not Found
      </motion.h1>

      {/* Subtext */}
      <motion.p
        className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Oops! The page you're looking for seems to have wandered off into the garden.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
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
      </motion.div>
    </div>
  );

};

export default NotFoundPage;
