import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = ({ onSearch, placeholder = "Search plants..." }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto px-2 sm:px-4"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="relative">
        {/* Glass background */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-lg border border-green-200/50" />

        <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4 sm:w-5 sm:h-5" />

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="relative w-full pl-9 sm:pl-12 pr-9 sm:pr-12 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-sm sm:text-base text-gray-700 placeholder-gray-400
            focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none
            transition-all duration-300 bg-transparent"
        />

        {/* Clear button */}
        <AnimatePresence>
          {searchTerm && (
            <motion.button
              type="button"
              onClick={handleClear}
              className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Glow animation */}
      <motion.div
        className="absolute -inset-1 rounded-xl sm:rounded-2xl bg-gradient-to-r from-green-400 via-emerald-500 to-lime-400 blur opacity-30"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </motion.form>
  );
};

export default SearchBar;
