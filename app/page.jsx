"use client";

import React, { useEffect } from "react";
import Banner from "@/components/Banner";
import ProductsList from "@/components/ProductsList";
import ProductsGroup from "@/components/ProductsGroup";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";

import useProductStore  from "@/store/productStore";

/* //Mock data
import products from "@/public/ProductsData"; */

const HomePage = () => {
  const { allProducts, fetchAllProducts, loading, error } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <div className="min-h-screen bg-gray-100 max-w-8xl m-auto">
      <Banner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Categories />
        {loading ? (<p>Loading...</p>) : error ? (<p>{error}</p>) : (<ProductsList products={allProducts} />)}
        <ProductsGroup />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
