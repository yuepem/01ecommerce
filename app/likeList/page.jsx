"use client";

import React, { useState } from "react";
import { Star, Heart, ChevronDown } from "lucide-react";
import Link from "next/link";

const PopularProductsList = () => {
  const [sortBy, setSortBy] = useState("popularity");

  // This would typically come from your backend or state management
  const products = [
    {
      id: 1,
      name: "Earthen Bottle",
      price: "$48",
      rating: 4.5,
      reviews: 117,
      likes: 230,
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
      imageAlt:
        "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    },
    {
      id: 2,
      name: "Nomad Tumbler",
      price: "$35",
      rating: 4.2,
      reviews: 98,
      likes: 186,
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
      imageAlt:
        "Olive drab green insulated bottle with flared screw lid and flat top.",
    },
    // Add more products here...
  ];

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "popularity") return b.likes - a.likes;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "priceLow")
      return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
    if (sortBy === "priceHigh")
      return parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1));
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">Popular Products</h1>

      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">Showing {products.length} products</p>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="popularity">Sort by Popularity</option>
            <option value="rating">Sort by Rating</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
          <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Link href={`/product/${product.id}`}>
              <div className="relative">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                  <Heart className="h-5 w-5 text-red-500" fill="currentColor" />
                </div>
              </div>
              <div className="p-4">
                <h2 className="font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">{product.price}</p>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <p className="ml-2 text-sm text-gray-600">
                    ({product.reviews} reviews)
                  </p>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {product.likes} people like this
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularProductsList;
