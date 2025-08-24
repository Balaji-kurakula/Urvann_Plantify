import React from 'react';
import { useCategories } from '../hooks/usePlants';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const { categories, loading } = useCategories();

  if (loading) return <div className="w-48 h-10 bg-gray-200 animate-pulse rounded-lg"></div>;

  return (
    <div className="relative w-full max-w-xs">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="w-full appearance-none px-4 py-2 rounded-xl border border-gray-300 
                  bg-white text-gray-700 font-medium shadow-sm
                  focus:ring-2 focus:ring-green-500 focus:border-green-500 
                  hover:border-green-400 transition-all outline-none cursor-pointer"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Dropdown Arrow Icon */}
      <svg
        className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );

};

export default CategoryFilter;
