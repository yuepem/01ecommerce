'use client';
import React from "react";


const Banner = () => {
  return (
    <div className="bg-violet-400 text-white py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mb-8 md:mb-0">
          <h2 className="text-3xl font-bold mb-2">Summer Sale</h2>
          <p className="mb-4">Up to 50% off on selected items</p>
          <button className="bg-white text-blue-500 px-4 py-2 rounded-md font-semibold">Shop Now</button>
        </div>
        <img src="" alt="Summer Sale" className="rounded-md" />
      </div>
    </div>
  );
};

export default Banner;