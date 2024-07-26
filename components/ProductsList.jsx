/* 'use client';

import React from 'react';
import { Star, ChevronDown } from 'lucide-react';

const ProductsList = ({ setIsQuickViewOpen }) => {
  const products = [1, 2, 3, 4]; // Replace with actual product data

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Featured Products</h3>
        <div className="flex items-center">
          <span className="mr-2">Filter</span>
          <ChevronDown size={20} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="/api/placeholder/300/200" alt="Product" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h4 className="font-semibold mb-2">Product Name</h4>
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-bold">$99.99</span>
                <div className="flex items-center">
                  <Star className="text-yellow-400 mr-1" size={16} />
                  <span className="text-sm text-gray-600">4.5 (120)</span>
                </div>
              </div>
              <button
                onClick={() => setIsQuickViewOpen(true)}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList; */

'use client';

import React from 'react';
import { Star, ChevronDown } from 'lucide-react';

const ProductsList = ({ setIsQuickViewOpen }) => {
  const products = [1, 2, 3, 4]; // Replace with actual product data

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Featured Products</h3>
        <div className="flex items-center">
          <span className="mr-2">Filter</span>
          <ChevronDown size={20} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col sm:flex-row">
            <img 
              src="/api/placeholder/300/200" 
              alt="Product" 
              className="w-1/3 sm:w-full h-full object-cover" 
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-semibold mb-2">Product Name</h4>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold">$99.99</span>
                  <div className="flex items-center">
                    <Star className="text-yellow-400 mr-1" size={16} />
                    <span className="text-sm text-gray-600">4.5 (120)</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsQuickViewOpen(true)}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;