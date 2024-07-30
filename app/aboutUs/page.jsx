"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const AboutAndContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to server)
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-8 text-center">
        About Us & Contact
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* About Us Section */}
        <div>
          <h2 className="text-2xl font-medium mb-4">Our Story</h2>
          <p className="mb-4 text-gray-600">
            Swed-Shark was founded in 2010 with a simple mission: to provide
            high-quality products and exceptional customer service. Over the
            years, we've grown from a small startup to a leading e-commerce
            platform, but our core values remain the same.
          </p>
          <p className="mb-6 text-gray-600">
            We believe in sustainability, innovation, and putting our customers
            first. Every product in our catalog is carefully selected to ensure
            it meets our high standards of quality and ethics.
          </p>

          <h3 className="text-xl font-medium mb-3">Contact Information</h3>
          <div className="space-y-2 text-gray-600">
            <div className="flex items-center">
              <Mail size={18} className="mr-2" />
              <span>info@swed-shark.com</span>
            </div>
            <div className="flex items-center">
              <Phone size={18} className="mr-2" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <MapPin size={18} className="mr-2" />
              <span>123 E-commerce St, Digital City, 12345</span>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div>
          <h2 className="text-2xl font-medium mb-4">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AboutAndContact;
