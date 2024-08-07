import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import mockProducts from '@/public/ProductsData';
// import mockCategories from '@/public/categoriesData';

const useProductStore = create(
    persist(
        (set, get) => ({
            allProducts: mockProducts,
            filteredProducts: mockProducts, // Initialize with all products
            selectedCategory: null,
            searchTerm: '',

            setSearchTerm: (term) => {
                set({ searchTerm: term });
                get().filterProducts();
            },


            setSelectedCategory: (categoryId) => {
                set({ selectedCategory: categoryId });
                get().filterProducts();
            },

            filterProducts: () => {
                const { allProducts, searchTerm, selectedCategory } = get();
                let filtered = allProducts;

                if (searchTerm) {
                    filtered = filtered.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
                }

                if (selectedCategory) {
                    filtered = filtered.filter((product) => product.categoryId === selectedCategory);
                }

                // If no filters are applied, show all products
                if (!searchTerm && !selectedCategory) {
                    filtered = allProducts;
                }

                set({ filteredProducts: filtered });
            },

            resetState: () => {
                set({
                    filteredProducts: get().allProducts,
                    selectedCategory: null,
                    searchTerm: '',
                });
            },
        }),
        {
            name: 'product-store',
            getStorage: () => localStorage,
        }
    )
);

// Custom hook to reset state on home page
export const useResetStateOnHome = () => {
    const router = useRouter();
    const resetState = useProductStore(state => state.resetState);

    useEffect(() => {
        if (router.pathname === '/') {
            resetState();
        }
    }, [router.pathname, resetState]);
};

export default useProductStore;