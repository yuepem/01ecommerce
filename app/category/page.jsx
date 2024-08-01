"use client";

import { useState, useEffect } from 'react';

const mockProducts = [
  { id: 1, name: "Earthen Bottle", price: "$48", imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg" },
  { id: 2, name: "Nomad Tumbler", price: "$35", imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg" },
  { id: 3, name: "Focus Paper Refill", price: "$89", imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg" },
  { id: 4, name: "Machined Mechanical Pencil", price: "$35", imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg" },
];

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(mockProducts);

  useEffect(() => {
    const results = mockProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-2xl font-semibold mb-6">Category Results</h2>
        
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {searchResults.map((product) => (
            <div key={product.id} className="group">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={product.imageSrc}
                  alt={product.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
            </div>
          ))}
        </div>

        {searchResults.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No results found for "{searchTerm}"</p>
        )}
      </div>
    </div>
  );
}