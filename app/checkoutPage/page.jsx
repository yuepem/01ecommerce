"use client";

import React, { useState } from "react";
import { CreditCard, Truck } from "lucide-react";

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to server)
    console.log("Form submitted:", formData);
  };

  // Sample cart items
  const cartItems = [
    { id: 1, name: "Earthen Bottle", price: 48, quantity: 1 },
    { id: 2, name: "Nomad Tumbler", price: 35, quantity: 2 },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 10;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="lg:flex lg:space-x-12">
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit}>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">
                Shipping Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">
                Payment Information
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
                <div className="flex space-x-4">
                  <input
                    type="text"
                    name="expirationDate"
                    placeholder="MM/YY"
                    value={formData.expirationDate}
                    onChange={handleInputChange}
                    className="w-1/2 px-3 py-2 border rounded-md"
                    required
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className="w-1/2 px-3 py-2 border rounded-md"
                    required
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
            >
              Place Order
            </button>
          </form>
        </div>
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping}</span>
                </div>
                <div className="flex justify-between font-semibold mt-2">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
