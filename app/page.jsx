"use client";

import React, { useState } from "react";
import Banner from "@/components/Banner";
import ProductsList from "@/components/ProductsList";
import ProductsList2 from "@/components/ProductsList2";
import ProductsGroup from "@/components/ProductsGroup";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";

const HomePage = () => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 max-w-8xl m-auto">
      <Banner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Categories />
        <ProductsList2 />
        <ProductsList setIsQuickViewOpen={setIsQuickViewOpen} />
        <ProductsGroup />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
