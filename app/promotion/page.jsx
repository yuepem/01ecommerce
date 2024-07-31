"use client";

import React from "react";
// import Link from "next/link";
import Image from 'next/image'
import summersale from '@/public/summer.jpg'
import faqs from '@/public/faqs.jpg'

const PromotionDetails = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
        {/* Hero Section */}
      <div className="bg-slate-400 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Summer Sale Extravaganza</h1>
          <p className="text-xl mb-8">
            Up to 50% off on selected items - Limited Time Only!
          </p>
          <div className="flex space-x-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-blue-50 transition duration-300">
              Shop Now
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Promotion Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Promotion Details</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Up to 50% off on summer clothing and accessories</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Additional 10% off for online orders over $100</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>
                  Free shipping on all orders during the promotion period
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Early access for loyalty program members</span>
              </li>
            </ul>
            <p className="mt-6 text-gray-600">
              *Offer valid from July 1 to August 31, 2024. Terms and conditions
              apply.
            </p>
          </div>
          <div>
            <Image
              src={summersale}
              alt="Summer Sale"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <Image
                src={faqs}
                alt="FAQs"
                className="rounded-lg shadow-md"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-8 ">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    How long does the sale last?
                  </h3>
                  <p className="text-gray-600">
                    The Summer Sale runs from July 1 to August 31, 2024.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Can I combine promotions?
                  </h3>
                  <p className="text-gray-600">
                    Generally, promotions cannot be combined unless explicitly
                    stated.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    What's your return policy for sale items?
                  </h3>
                  <p className="text-gray-600">
                    Our standard 30-day return policy applies to all sale items.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionDetails;
