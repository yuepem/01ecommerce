'use client';

import { useState } from 'react';
import Navigation from "@/components/Navigation";

export default function ClientWrapper({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  return (
    <>
      <Navigation isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} setSearchResults={setSearchResults}/>
      {children}
    </>
  );
}