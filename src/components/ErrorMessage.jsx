import React from 'react';
 import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";


const ErrorMessage = ({ message, onRetry }) => {
 
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, repeatType: "loop" }}
        className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4"
      >
        <AlertCircle className="w-8 h-8 text-red-500" />
      </motion.div>

      {/* Error Title */}
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
        Oops! Something went wrong
      </h3>

      {/* Error Message */}
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>

      {/* Retry Button */}
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </motion.button>
      )}
    </div>
  );

};

export default ErrorMessage;
