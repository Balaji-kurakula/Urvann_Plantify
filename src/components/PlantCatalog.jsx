import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import PlantCard from './PlantCard';
import useWishlist from '../hooks/useWishlist';
import { useCart } from '../context/CartContext';
 import { motion } from "framer-motion";
import { X } from "lucide-react";

const PlantCatalog = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  
  // Wishlist and Cart functionality
  const { wishlist, toggleWishlist, isInWishlist, wishlistCount } = useWishlist();
  const { cartCount } = useCart();

  // Fetch plants from backend
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const response = await fetch(`${API_BASE_URL}/plants`);
        if (!response.ok) {
          throw new Error('Failed to fetch plants');
        }
        const data = await response.json();
        setPlants(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  // Wishlist toggle handler
  const handleToggleWishlist = async (plant) => {
    try {
      await toggleWishlist(plant);
    } catch (error) {
      console.error('Wishlist toggle error:', error);
    }
  };

  // Filter plants
  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plant.scientificName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || plant.categories.includes(selectedCategory);
    const matchesStock = !inStockOnly || plant.isAvailable;
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading plants...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">❌ Error loading plants</div>
        <p className="text-gray-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search plants..."
              className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            >
              <option value="">All Categories</option>
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Succulent">Succulent</option>
              <option value="Air Purifying">Air Purifying</option>
              <option value="Home Decor">Home Decor</option>
            </select>

            <label className="flex items-center gap-2 whitespace-nowrap cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">In Stock Only</span>
            </label>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <span className="px-3 py-1 rounded-full bg-green-50 text-green-700">
            🌱 {filteredPlants.length} plants found
          </span>
          <span className="px-3 py-1 rounded-full bg-pink-50 text-pink-600">
            ❤️ {wishlistCount} in wishlist
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600">
            🛒 {cartCount} in cart
          </span>
        </div>
      </div>

      {/* Plant Grid */}
      {filteredPlants.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No plants found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          {filteredPlants.map((plant) => (
            <motion.div
              key={plant._id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <PlantCard
                plant={plant}
                isInWishlist={isInWishlist(plant._id)}
                onToggleWishlist={handleToggleWishlist}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );

};

export default PlantCatalog;
