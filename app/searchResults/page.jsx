"use client";

import { useState, useEffect } from "react";
import Categories from "@/components/Categories";
import ProductsList from "@/components/ProductsList";

import products from "@/public/ProductsData";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(products);

  useEffect(() => {
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Categories />

        <h2 className="text-2xl font-semibold mb-6">Search Results</h2>

        <ProductsList products={products} />

        {searchResults.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No results found for "{searchTerm}"
          </p>
        )}
      </div>
    </div>
  );
}
