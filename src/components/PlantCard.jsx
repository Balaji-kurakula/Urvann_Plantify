import React, { useState } from 'react';
import { Heart, ShoppingCart, Leaf, Sun, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const PlantCard = ({ plant, isInWishlist, onToggleWishlist }) => {
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);
  const { addToCart, isInCart, loading } = useCart();

  // Check if plant is in cart
  const plantInCart = isInCart(plant._id);

  const handleAddToCart = async () => {
    if (!plant.isAvailable || plantInCart || loading) return;
    await addToCart(plant);
  };

  const handleToggleWishlist = async () => {
    if (isTogglingWishlist) return;
    
    setIsTogglingWishlist(true);
    try {
      await onToggleWishlist(plant);
    } finally {
      setIsTogglingWishlist(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="relative">
        {/* Plant Image */}
        <div className="h-48 bg-green-100 flex items-center justify-center">
          <span className="text-6xl">🪴</span>
        </div>
        
        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          disabled={isTogglingWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            isInWishlist 
              ? 'bg-red-500 text-white shadow-lg scale-110' 
              : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500 hover:scale-110'
          } ${isTogglingWishlist ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart 
            className={`w-5 h-5 transition-all ${isInWishlist ? 'fill-current' : ''}`} 
          />
        </button>
        
        {/* Stock Status */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            plant.isAvailable 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {plant.isAvailable ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>

      <div className="p-4">
        {/* Plant Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {plant.name}
        </h3>
        
        {/* Scientific Name */}
        {plant.scientificName && (
          <p className="text-sm text-gray-500 italic mb-2">{plant.scientificName}</p>
        )}
        
        {/* Categories */}
        <div className="flex flex-wrap gap-1 mb-3">
          {plant.categories.slice(0, 3).map((category) => (
            <span
              key={category}
              className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
            >
              {category}
            </span>
          ))}
          {plant.categories.length > 3 && (
            <span className="text-xs text-gray-400">+{plant.categories.length - 3}</span>
          )}
        </div>

        {/* Plant Info */}
        <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Leaf className="w-3 h-3" />
            <span>{plant.lightRequirement || 'Medium'} Care</span>
          </div>
          <div className="flex items-center gap-1">
            <Sun className="w-3 h-3" />
            <span>{plant.lightRequirement || 'Medium'} Light</span>
          </div>
        </div>
        
        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-600">₹{plant.price}</span>
          </div>
          
          {/* Dynamic Button */}
          {plantInCart ? (
            <button
              disabled
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-green-100 text-green-700 border-2 border-green-200"
            >
              <Check className="w-4 h-4" />
              In Cart
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={!plant.isAvailable || loading}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                plant.isAvailable && !loading
                  ? 'bg-green-600 text-white hover:bg-green-700 hover:scale-105 active:scale-95'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              {loading ? 'Adding...' : plant.isAvailable ? 'Add to Cart' : 'Unavailable'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
