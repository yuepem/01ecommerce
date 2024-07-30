'use client';

import React, { useState } from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);

  const product = {
    name: "Earthen Bottle",
    price: "$48",
    description: "Tall slender porcelain bottle with natural clay textured body and cork stopper. Perfect for serving water, wine, or any other beverage with style.",
    rating: 4.5,
    reviews: 117,
    imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    imageAlt: "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  };

  const handleQuantityChange = (e) => {
    setQuantity(Math.max(1, parseInt(e.target.value)));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:flex lg:items-start">
        <div className="lg:w-1/2">
          <img
            src={product.imageSrc}
            alt={product.imageAlt}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="mt-10 lg:mt-0 lg:ml-10 lg:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-2 text-3xl text-gray-900">{product.price}</p>
          <div className="mt-4 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                />
              ))}
            </div>
            <p className="ml-2 text-sm text-gray-600">
              {product.rating} ({product.reviews} reviews)
            </p>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900">Description</h2>
            <p className="mt-2 text-gray-600">{product.description}</p>
          </div>
          <div className="mt-8">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mt-8 flex space-x-4">
            <button className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition duration-300 flex items-center justify-center">
              <ShoppingCart className="mr-2" size={20} />
              Add to Cart
            </button>
            <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md font-semibold hover:bg-gray-300 transition duration-300 flex items-center justify-center">
              <Heart className="mr-2" size={20} />
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

