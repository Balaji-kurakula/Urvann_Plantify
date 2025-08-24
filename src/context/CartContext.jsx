import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Get user ID
  const getUserId = () => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = 'user-' + Date.now();
      localStorage.setItem('userId', userId);
    }
    return userId;
  };

  // Load cart from database on mount
  useEffect(() => {
    fetchCart();
  }, []);

  // Fetch cart from database
  const fetchCart = async () => {
    try {
      setLoading(true);
      const userId = getUserId();
      const response = await fetch(`http://localhost:5000/api/cart/${userId}`);
      
      if (response.ok) {
        const data = await response.json();
        setCart(data.data.items);
        setCartCount(data.data.totalItems);
      }
    } catch (error) {
      console.error('Fetch cart error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add to cart
  const addToCart = async (plant) => {
    try {
      setLoading(true);
      const userId = getUserId();
      const response = await fetch(`http://localhost:5000/api/cart/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plantId: plant._id,
          quantity: 1
        }),
      });

      if (response.ok) {
        const data = await response.json();
        await fetchCart(); // Refresh cart data
        toast.success(`${plant.name} added to cart!`, {
          position: "top-right",
          autoClose: 2000,
        });
        return { success: true };
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add to cart');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Failed to add to cart', {
        position: "top-right",
        autoClose: 2000,
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // Update quantity
  const updateQuantity = async (plantId, newQuantity) => {
    if (newQuantity <= 0) {
      return removeFromCart(plantId);
    }

    try {
      setLoading(true);
      const userId = getUserId();
      const response = await fetch(`http://localhost:5000/api/cart/${userId}/${plantId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (response.ok) {
        await fetchCart(); // Refresh cart data
        return { success: true };
      } else {
        throw new Error('Failed to update quantity');
      }
    } catch (error) {
      console.error('Update quantity error:', error);
      toast.error('Failed to update quantity', {
        position: "top-right",
        autoClose: 2000,
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // Remove from cart
  const removeFromCart = async (plantId) => {
    try {
      setLoading(true);
      const userId = getUserId();
      const response = await fetch(`http://localhost:5000/api/cart/${userId}/${plantId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchCart(); // Refresh cart data
        toast.info('Item removed from cart', {
          position: "top-right",
          autoClose: 2000,
        });
        return { success: true };
      } else {
        throw new Error('Failed to remove from cart');
      }
    } catch (error) {
      console.error('Remove from cart error:', error);
      toast.error('Failed to remove from cart', {
        position: "top-right",
        autoClose: 2000,
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      setLoading(true);
      const userId = getUserId();
      const response = await fetch(`http://localhost:5000/api/cart/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCart([]);
        setCartCount(0);
        toast.info('Cart cleared', {
          position: "top-right",
          autoClose: 2000,
        });
        return { success: true };
      } else {
        throw new Error('Failed to clear cart');
      }
    } catch (error) {
      console.error('Clear cart error:', error);
      toast.error('Failed to clear cart', {
        position: "top-right",
        autoClose: 2000,
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // Check if plant is in cart
  const isInCart = (plantId) => {
    return cart.some(item => item._id === plantId);
  };

  const value = {
    cart,
    cartCount,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart: (plantId) => cart.some(item => item._id === plantId), // Add this line
    fetchCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
