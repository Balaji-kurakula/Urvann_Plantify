import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Leaf, Plus, Heart, ShoppingCart } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Import components and providers
import { CartProvider } from './context/CartContext';
import { useCart } from './context/CartContext';
import PlantCatalog from './components/PlantCatalog';
import AddPlantForm from './components/AddPlantForm';
import WishlistPage from './components/WishlistPage';
import CartPage from './components/CartPage';
import NotFoundPage from './components/NotFoundPage';
import useWishlist from './hooks/useWishlist';
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const AppHeader = ({ showAddForm, setShowAddForm }) => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-green-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Urvann Plant Store
            </h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            {/* Cart Button */}
            <button
              onClick={() => (window.location.href = "/cart")}
              className="relative flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-green-600 transition rounded-lg hover:bg-gray-50"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => (window.location.href = "/wishlist")}
              className="relative flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-green-600 transition rounded-lg hover:bg-gray-50"
            >
              <Heart className="w-5 h-5" />
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Add Plant Button */}
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Plant</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-lg transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-md border-t"
          >
            <div className="flex flex-col p-4 gap-3">
              <button
                onClick={() => (window.location.href = "/cart")}
                className="relative flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-green-600 transition rounded-lg hover:bg-gray-50"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="absolute right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => (window.location.href = "/wishlist")}
                className="relative flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-green-600 transition rounded-lg hover:bg-gray-50"
              >
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="absolute right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add Plant</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};


// Main App component
function AppContent() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <AppHeader showAddForm={showAddForm} setShowAddForm={setShowAddForm} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<PlantCatalog />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/plants" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Add Plant Form Modal */}
        {showAddForm && (
          <AddPlantForm
            isOpen={showAddForm}
            onClose={() => setShowAddForm(false)}
            onPlantAdded={() => {
              setShowAddForm(false);
              window.location.reload();
            }}
          />
        )}

        {/* Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

// App with providers
function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
