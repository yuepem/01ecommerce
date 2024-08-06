/* "use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Minus, Plus } from "lucide-react";
import useCartStore from "@/store/cartStore";
import useProductStore from "@/store/cartStore";

const ProductsList = ({ products }) => {
  const [likedProducts, setLikedProducts] = useState({});
  const { addItem, updateQuantity } = useCartStore();
  const { fetchProductById } = useProductStore();
  const cartItems = useCartStore.getState().items;

  const toggleLike = (productId) => {
    setLikedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // add product to cart handler
  const addToCart = async (productId) => {
    const product = await fetchProductById(productId);
    addItem(product);
  };

  // update cart quantity handler
  const updateCartQuantity = (productId, delta) => {
    // const cartItems = useCartStore.getState().items;
    const existingItem = cartItems.find((item) => item.id === productId);

    if (existingItem) {
      const newQuantity = Math.max(0, existingItem.quantity + delta);
      if (newQuantity === 0) {
        removeItem(productId);
      } else {
        updateQuantity(productId, newQuantity);
      }
    } else if (delta > 0) {
      addItem(productId);
    }
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
 */


"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Minus, Plus } from "lucide-react";
import useCartStore from "@/store/cartStore";
import useProductStore from "@/store/productStore";

const ProductsList = ({ products }) => {
  const [likedProducts, setLikedProducts] = useState({});
  const { addItem, updateQuantity, removeItem, items: cartItems } = useCartStore();
  const { fetchProductById } = useProductStore();

  const toggleLike = (productId) => {
    setLikedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const addToCart = (productId) => {
    addItem(productId);
  };

  const updateCartQuantity = (productId, delta) => {
    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
      const newQuantity = Math.max(0, existingItem.quantity + delta);
      if (newQuantity === 0) {
        removeItem(productId);
      } else {
        updateQuantity(productId, newQuantity);
      }
    } else if (delta > 0) {
      const product = products.find(p => p.id === productId);
      if (product) {
        addToCart(product.id);
      }
    }
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
              {cartItems.find(item => item.id === product.id) ? (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateCartQuantity(product.id, -1)}
                    className="p-1 bg-gray-200 rounded"
                  >
                    <Minus size={18} />
                  </button>
                  <span>{cartItems.find(item => item.id === product.id)?.quantity || 0}</span>
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
                  className="p-2  text-white rounded-full"
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