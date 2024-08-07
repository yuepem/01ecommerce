"use client";

import React, { useState } from "react";
import Banner from "@/components/Banner";

import ProductsList from "@/components/ProductsList";
import ProductsGroup from "@/components/ProductsGroup";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";



const HomePage = () => {
 
  return (
    <div className="min-h-screen bg-gray-100 max-w-8xl m-auto">
      <Banner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Categories />
        <ProductsList  />
        <ProductsGroup />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
