"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Minus, Plus } from "lucide-react";
import useCartStore from "@/store/cartStore";
import useProductStore from "@/store/productStore";
import { v4 as uuidv4 } from 'uuid';

const getOrCreateCartId = () => {
  let cartId = localStorage.getItem('temporaryCartId');
  if (!cartId) {
    cartId = uuidv4();
    localStorage.setItem('temporaryCartId', cartId);
  }
  return cartId;
};

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

  const addToCart = async (productId) => {
    const cartId = getOrCreateCartId();
    try {
      const response = await fetch(`/api/carts/${cartId}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (response.ok) {
        addItem(productId, 1);
      } else {
        console.error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const updateCartQuantity = async (productId, delta) => {
    const cartId = getOrCreateCartId();
    const existingItem = cartItems.find(item => item.productId === productId);
    const newQuantity = existingItem ? Math.max(0, existingItem.quantity + delta) : (delta > 0 ? 1 : 0);

    try {
      if (newQuantity === 0) {
        await fetch(`/api/carts/${cartId}/items/${productId}`, { method: 'DELETE' });
        removeItem(productId);
      } else {
        await fetch(`/api/carts/${cartId}/items/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity: newQuantity }),
        });
        updateQuantity(productId, newQuantity);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
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
                  className={`h-5 w-5 ${likedProducts[product.id]
                      ? "text-red-500 fill-current"
                      : "text-gray-400"
                    }`}
                />
              </button>
              {cartItems.find(item => item.productId === product.id) ? (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateCartQuantity(product.id, -1)}
                    className="p-1 bg-gray-200 rounded"
                  >
                    <Minus size={18} />
                  </button>
                  <span>{cartItems.find(item => item.productId === product.id)?.quantity || 0}</span>
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
                  className="p-2 bg-gray-200 text-gray-500 rounded-full"
                >
                  <ShoppingCart size={20} />
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