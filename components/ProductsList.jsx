"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Minus, Plus } from "lucide-react";
import useCartStore from "@/store/useCartStore";
import useProductStore from "@/store/useProductStore";

const ProductsList = () => {
  const [likedProducts, setLikedProducts] = useState({});
  // const [cartItems, setCartItems] = useState({});
  const {cartItems, addToCart, updateCartQuantity } = useCartStore();

  const { filteredProducts } = useProductStore();
  const products = filteredProducts; // Provide a default empty array if filteredProducts is undefined

  const toggleLike = (productId) => {
    setLikedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <div className="my-5">
      <div className="mt-5">
        <p className="text-gray-600">
          Showing {products.length} product{products.length !== 1 ? 's' : ''}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <div key={product.id} className="group">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
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