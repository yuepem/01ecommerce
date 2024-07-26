'use client';
import React from "react";
const ProductsGroup = () => {
  return (
    <div className="mt-16">
      <div className="bg-gray-200 rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              src="/api/placeholder/300/200"
              alt="Special Products"
              className="h-48 w-full object-cover md:w-48"
            />
          </div>
          <div className="p-8">
            <h3 className="text-2xl font-semibold mb-2">New Arrivals</h3>
            <p className="text-gray-600 mb-4">
              Check out our latest collection of trendy items
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-300">
              Explore Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsGroup;
