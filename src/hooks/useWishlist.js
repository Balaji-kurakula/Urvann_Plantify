import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get user ID (for demo purposes, using localStorage)
  const getUserId = () => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = 'user-' + Date.now();
      localStorage.setItem('userId', userId);
      console.log('Generated new user ID:', userId);
    }
    return userId;
  };

  // Load wishlist from backend on mount
  useEffect(() => {
    fetchWishlistFromAPI();
  }, []);

  // Fetch wishlist from API
  const fetchWishlistFromAPI = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const userId = getUserId();
      
      console.log('Fetching wishlist for user:', userId);
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_BASE_URL}/wishlist/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Wishlist fetch response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Wishlist data received:', data);
        
        if (data.success && data.data && data.data.plants) {
          const plantIds = data.data.plants.map(plant => plant._id);
          setWishlist(plantIds);
          console.log('Wishlist plant IDs:', plantIds);
        } else {
          setWishlist([]);
        }
      } else {
        const errorData = await response.json();
        console.error('Wishlist fetch error:', errorData);
        setError(errorData.message || 'Failed to fetch wishlist');
        setWishlist([]);
      }
    } catch (error) {
      console.error('Wishlist fetch exception:', error);
      setError(error.message);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add to wishlist
  const addToWishlist = useCallback(async (plant) => {
    try {
      setLoading(true);
      const userId = getUserId();
      
      console.log('Adding to wishlist:', { userId, plantId: plant._id, plantName: plant.name });
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_BASE_URL}/wishlist/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plantId: plant._id,
          notes: `Added ${plant.name} to wishlist`
        }),
      });

      console.log('Add to wishlist response status:', response.status);
      
      const data = await response.json();
      console.log('Add to wishlist response:', data);

      if (response.ok && data.success) {
        // Update local state immediately
        setWishlist(prev => {
          if (!prev.includes(plant._id)) {
            const newWishlist = [...prev, plant._id];
            console.log('Updated wishlist state:', newWishlist);
            return newWishlist;
          }
          return prev;
        });

        toast.success(`❤️ ${plant.name} added to wishlist!`, {
          position: "top-right",
          autoClose: 2000,
        });

        // Fetch fresh data to ensure synchronization
        setTimeout(() => fetchWishlistFromAPI(), 500);

        return { success: true, message: 'Added to wishlist!' };
      } else {
        throw new Error(data.message || 'Failed to add to wishlist');
      }
    } catch (error) {
      console.error('Add to wishlist error:', error);
      toast.error(`Failed to add to wishlist: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  }, [fetchWishlistFromAPI]);

  // Remove from wishlist
  const removeFromWishlist = useCallback(async (plantId) => {
    try {
      setLoading(true);
      const userId = getUserId();
      
      console.log('Removing from wishlist:', { userId, plantId });
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_BASE_URL}/wishlist/${userId}/${plantId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Remove from wishlist response status:', response.status);
      
      const data = await response.json();
      console.log('Remove from wishlist response:', data);

      if (response.ok && data.success) {
        // Update local state immediately
        setWishlist(prev => {
          const newWishlist = prev.filter(id => id !== plantId);
          console.log('Updated wishlist state after removal:', newWishlist);
          return newWishlist;
        });

        toast.info('💔 Removed from wishlist', {
          position: "top-right",
          autoClose: 2000,
        });

        // Fetch fresh data to ensure synchronization
        setTimeout(() => fetchWishlistFromAPI(), 500);

        return { success: true, message: 'Removed from wishlist!' };
      } else {
        throw new Error(data.message || 'Failed to remove from wishlist');
      }
    } catch (error) {
      console.error('Remove from wishlist error:', error);
      toast.error(`Failed to remove from wishlist: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  }, [fetchWishlistFromAPI]);

  // Toggle wishlist
  const toggleWishlist = useCallback(async (plant) => {
    const isInWishlist = wishlist.includes(plant._id);
    console.log('Toggling wishlist for plant:', plant.name, 'Currently in wishlist:', isInWishlist);
    
    if (isInWishlist) {
      return await removeFromWishlist(plant._id);
    } else {
      return await addToWishlist(plant);
    }
  }, [wishlist, addToWishlist, removeFromWishlist]);

  // Check if plant is in wishlist
  const isInWishlist = useCallback((plantId) => {
    const inWishlist = wishlist.includes(plantId);
    console.log('Checking if plant is in wishlist:', plantId, 'Result:', inWishlist);
    return inWishlist;
  }, [wishlist]);

  return {
    wishlist,
    loading,
    error,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    fetchWishlistFromAPI,
    wishlistCount: wishlist.length
  };
};

// THIS LINE IS CRUCIAL - Make sure you have this at the end
export default useWishlist;
