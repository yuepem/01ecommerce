"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCart, User, Heart, Search } from "lucide-react";

const Navigation = ({ setIsCartOpen }) => {
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);

  const toggleMobileSearch = () => {
    setIsMobileSearchVisible(!isMobileSearchVisible);
  };

  // Avoiding mobile search bar remaining open when resizing the screen
  useEffect(() => {
    const closeMobileSearch = () => {
      if (window.innerWidth >= 640) {
        setIsMobileSearchVisible(false);
      }
    };

    window.addEventListener("resize", closeMobileSearch);
    return () => {
      window.removeEventListener("resize", closeMobileSearch);
    };
  }, [])


  return (
    <header>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="font-bold text-xl">Swed-Shark</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <SearchBar />
              <NavIcons setIsCartOpen={setIsCartOpen} />
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden items-center space-x-3">
              <Search
                onClick={toggleMobileSearch}
                className="text-gray-600 cursor-pointer"
                size={24}
              />
              <NavIcons setIsCartOpen={setIsCartOpen} />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Search Bar */}
      {isMobileSearchVisible && window.innerWidth < 640 && <MobileSearchBar />}
    </header>
  );
};

const SearchBar = () => (
  <div className="relative">
    <input
      type="text"
      placeholder="Search..."
      className="pl-8 pr-4 py-2 border rounded-md"
    />
    <Search className="absolute left-2 top-2.5 text-gray-400" size={20} />
  </div>
);

const NavIcons = ({ setIsCartOpen }) => (
  <>
    <button onClick={() => setIsCartOpen(true)} className="relative">
      <ShoppingCart className="text-gray-600" size={24} />
      <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
        3
      </span>
    </button>
    <User className="text-gray-600" size={24} />
    <Heart className="text-gray-600" size={24} />
  </>
);

const MobileSearchBar = () => (
  <div className="bg-white shadow-md p-4">
    <div className="relative mx-auto">
      <input
        type="text"
        placeholder="Search..."
        className="w-full pl-8 pr-4 py-2 border rounded-md"
      />
      <Search className="absolute left-2 top-2.5 text-gray-400" size={20} />
    </div>
  </div>
);

export default Navigation;
