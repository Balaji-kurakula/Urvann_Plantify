import React from 'react';
import { useCategories } from '../hooks/usePlants';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const { categories, loading } = useCategories();

  if (loading) return <div className="w-48 h-10 bg-gray-200 animate-pulse rounded-lg"></div>;

  return (
    <select
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white"
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
