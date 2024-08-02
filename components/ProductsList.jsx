"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Minus, Plus } from "lucide-react";

const ProductsList = ({ products }) => {
  const [likedProducts, setLikedProducts] = useState({});
  const [cartItems, setCartItems] = useState({});

  const toggleLike = (productId) => {
    setLikedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const addToCart = (productId) => {
    setCartItems((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const updateCartQuantity = (productId, delta) => {
    setCartItems((prev) => {
      const newQuantity = (prev[productId] || 0) + delta;
      if (newQuantity <= 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: newQuantity };
    });
  };

  return (
    <div className="my-5">
        <div className="mt-5">
          <p className="text-gray-600">Showing {products.length} products</p>
        </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <Link href="/productDetails" className="block">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {product.price}
              </p>
            </Link>
            <div className="mt-2 flex justify-between items-center">
              <button onClick={() => toggleLike(product.id)} className="p-2">
                <Heart
                  className={`h-5 w-5 ${
                    likedProducts[product.id]
                      ? "text-red-500 fill-current"
                      : "text-gray-400"
                  }`}
                />
              </button>
              {cartItems[product.id] ? (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateCartQuantity(product.id, -1)}
                    className="p-1 bg-gray-200 rounded"
                  >
                    <Minus size={18} />
                  </button>
                  <span>{cartItems[product.id]}</span>
                  <button
                    onClick={() => updateCartQuantity(product.id, 1)}
                    className="p-1 bg-gray-200 rounded"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(product.id)}
                  className="p-2 color text-white rounded-full"
                >
                  <ShoppingCart className="text-gray-500" size={20} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
