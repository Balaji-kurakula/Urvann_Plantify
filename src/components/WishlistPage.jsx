import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft, ShoppingCart, Trash2, RefreshCw, Check } from 'lucide-react';
import useWishlist from '../hooks/useWishlist';
import { useCart } from '../context/CartContext'; // Import cart context

const WishlistPage = () => {
  const navigate = useNavigate();
  const [wishlistPlants, setWishlistPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { wishlist, removeFromWishlist, wishlistCount, fetchWishlistFromAPI } = useWishlist();
  const { addToCart, cart, isInCart } = useCart(); // Use cart context

  // Get user ID
  const getUserId = () => {
    return localStorage.getItem('userId') || 'user-' + Date.now();
  };

  // Fetch wishlist plants from backend
  const fetchWishlistPlants = async () => {
    try {
      setLoading(true);
      setError(null);
      const userId = getUserId();
      
      console.log('Fetching wishlist plants for user:', userId);
      
      const response = await fetch(`http://localhost:5000/api/wishlist/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Wishlist fetch response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Wishlist API response:', data);
      
      if (data.success) {
        const plants = data.data.plants || [];
        console.log('Setting wishlist plants:', plants);
        setWishlistPlants(plants);
      } else {
        throw new Error(data.message || 'Failed to fetch wishlist');
      }
    } catch (err) {
      console.error('Wishlist fetch error:', err);
      setError(err.message);
      setWishlistPlants([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch wishlist plants on component mount
  useEffect(() => {
    fetchWishlistPlants();
  }, []);

  // Refetch when wishlist count changes
  useEffect(() => {
    console.log('Wishlist count changed:', wishlistCount);
    if (wishlistCount > 0) {
      fetchWishlistPlants();
    } else {
      setWishlistPlants([]);
      setLoading(false);
    }
  }, [wishlistCount]);

  // Handle remove from wishlist
  const handleRemoveFromWishlist = async (plantId, plantName) => {
    try {
      console.log('Removing plant from wishlist:', plantId, plantName);
      const result = await removeFromWishlist(plantId);
      if (result.success) {
        // Remove from local state immediately
        setWishlistPlants(prev => prev.filter(plant => plant._id !== plantId));
      }
    } catch (error) {
      console.error('Remove from wishlist error:', error);
    }
  };

  // Handle add to cart with state update
  const handleAddToCart = async (plant) => {
    if (!plant.isAvailable || isInCart(plant._id)) return;
    
    try {
      await addToCart(plant);
      // The cart context will handle the state update and toast notification
    } catch (error) {
      console.error('Add to cart error:', error);
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    fetchWishlistFromAPI();
    fetchWishlistPlants();
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-green-600 hover:text-green-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Plants
          </button>
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500 fill-current" />
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          </div>
        </div>
        
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-green-600 hover:text-green-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Plants
          </button>
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500 fill-current" />
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          </div>
        </div>
        
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">❌ Error loading wishlist</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={handleRefresh}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-green-600 hover:text-green-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Plants
          </button>
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500 fill-current" />
            <h1 className="text-3xl font-bold text-gray-900">
              My Wishlist ({wishlistPlants.length})
            </h1>
          </div>
        </div>
        
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Empty State */}
      {wishlistPlants.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 mb-8">
            Start adding plants you love to your wishlist!
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Browse Plants
          </button>
        </div>
      ) : (
        <>
          {/* Wishlist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistPlants.map((plant) => {
              const plantInCart = isInCart(plant._id); // Check if plant is in cart
              
              return (
                <div key={plant._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                  {/* Plant Image */}
                  <div className="relative">
                    <div className="h-48 bg-green-100 flex items-center justify-center">
                      <span className="text-6xl">🪴</span>
                    </div>
                    
                    {/* Remove from Wishlist Button */}
                    <button
                      onClick={() => handleRemoveFromWishlist(plant._id, plant.name)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
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

                  {/* Plant Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{plant.name}</h3>
                    
                    {plant.scientificName && (
                      <p className="text-sm text-gray-500 italic mb-2">{plant.scientificName}</p>
                    )}
                    
                    {/* Categories */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {plant.categories?.slice(0, 3).map((category) => (
                        <span key={category} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          {category}
                        </span>
                      ))}
                    </div>

                    {/* Added Date */}
                    {plant.addedAt && (
                      <p className="text-xs text-gray-400 mb-3">
                        Added {new Date(plant.addedAt).toLocaleDateString()}
                      </p>
                    )}
                    
                    {/* Price & Dynamic Add to Cart Button */}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600">₹{plant.price}</span>
                      
                      {/* Conditional Button Rendering */}
                      {plantInCart ? (
                        <button
                          disabled
                          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-green-100 text-green-700 border-2 border-green-200 cursor-not-allowed"
                        >
                          <Check className="w-4 h-4" />
                          Added to Cart
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(plant)}
                          disabled={!plant.isAvailable}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                            plant.isAvailable
                              ? 'bg-green-600 text-white hover:bg-green-700 hover:scale-105 active:scale-95'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          {plant.isAvailable ? 'Add to Cart' : 'Unavailable'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bulk Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                wishlistPlants.forEach(plant => {
                  if (plant.isAvailable && !isInCart(plant._id)) {
                    handleAddToCart(plant);
                  }
                });
              }}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Add All Available to Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default WishlistPage;
