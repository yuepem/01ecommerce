'use client';
import React from "react";
import Link from "next/link";

const Categories = () => {
  const categories = ["Electronics", "Clothing", "Home", "Sports", "Beauty"];

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Categories</h3>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {categories.map((category) => (
          <Link href='/category' key={category} className="flex-shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-md mb-2"></div>
            <p className="text-center text-sm">{category}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;