"use client";

import React, { useState } from "react";
import Image from "next/image";
import { User, Mail, Phone, MapPin, Package, CreditCard, Heart, LogOut, ChevronDown, ChevronUp } from 'lucide-react';
import avatar from '@/public/avatar.png';


const UserAccount = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [expandedOrder, setExpandedOrder] = useState(null);

  const user = {
    name: "Xiao Yue",
    email: "xiao.yue@example.com",
    phone: "+1 234 567 8900",
    address: "123 Main St, Anytown, AN 12345",
    avatar: { avatar },
  };

  const orders = [
    { id: "1234", date: "2023-07-15", total: "$120.00", status: "Delivered" },
    { id: "5678", date: "2023-06-30", total: "$85.50", status: "Shipped" },
    { id: "9012", date: "2023-06-15", total: "$200.00", status: "Processing" },
  ];

  const wishlist = [
    { id: "1", name: "Wireless Headphones", price: "$79.99" },
    { id: "2", name: "Smart Watch", price: "$199.99" },
    { id: "3", name: "Portable Charger", price: "$49.99" },
  ];

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const renderProfile = () => (
    <div className="space-y-4">
      <div className="flex items-center">
        <User size={20} className="text-gray-400 mr-2" />
        <span>{user.name}</span>
      </div>
      <div className="flex items-center">
        <Mail size={20} className="text-gray-400 mr-2" />
        <span>{user.email}</span>
      </div>
      <div className="flex items-center">
        <Phone size={20} className="text-gray-400 mr-2" />
        <span>{user.phone}</span>
      </div>
      <div className="flex items-center">
        <MapPin size={20} className="text-gray-400 mr-2" />
        <span>{user.address}</span>
      </div>
    </div>
  );

  const renderOrders = () => {
    if (!orders || orders.length === 0) {
      return <p>No orders found.</p>;
    }
  
    return (
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="border rounded-lg overflow-hidden">
            <div 
              className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
              onClick={() => toggleOrderExpansion(order.id)}
            >
              <div>
                <p className="font-medium">Order #{order.id}</p>
                <p className="text-sm text-gray-600">{order.date}</p>
              </div>
              <div className="text-right flex items-center">
                <div className="mr-4">
                  <p>{order.total}</p>
                  <p className="text-sm text-gray-600">{order.status}</p>
                </div>
                {expandedOrder === order.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>
            {expandedOrder === order.id && (
              <div className="p-4 bg-white">
                <h4 className="font-medium mb-2">Order Details:</h4>
                {order.items && order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center mb-2">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>{item.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderWishlist = () => (
    <div className="space-y-4">
      {wishlist.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border-b pb-2"
        >
          <p>{item.name}</p>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return renderProfile();
      case "orders":
        return renderOrders();
      case "wishlist":
        return renderWishlist();
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Image
          src={user.avatar.avatar}
          alt={user.name}
          className="w-20 h-20 rounded-full mr-4"
        />
        <h1 className="text-2xl font-medium">Welcome, {user.name}</h1>
      </div>

      <div className="flex mb-6">
        <button
          onClick={() => setActiveTab("profile")}
          className={`mr-4 pb-2 ${
            activeTab === "profile" ? "border-b-2 border-gray-800" : ""
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`mr-4 pb-2 ${
            activeTab === "orders" ? "border-b-2 border-gray-800" : ""
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab("wishlist")}
          className={`mr-4 pb-2 ${
            activeTab === "wishlist" ? "border-b-2 border-gray-800" : ""
          }`}
        >
          Wishlist
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">{renderContent()}</div>

      <div className="mt-8 flex justify-between">
        <button className="text-gray-600 hover:text-gray-800 flex items-center">
          <CreditCard size={20} className="mr-2" />
          Payment Methods
        </button>
        <button className="text-gray-600 hover:text-gray-800 flex items-center">
          <LogOut size={20} className="mr-2" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserAccount;
