import {create} from 'zustand';

const useProductStore = create((set) => ({
    allProducts: [],
    productsByCategory: {},
    selectedProduct: null,
    loading: false,
    error: null,

    /* Fetch all products */
    fetchAllProducts: async () => {
        set({loading: true, error: null});
        try {
            const response = await fetch('/api/products');
            if (!response.ok) throw new Error('Network response was not ok');
            const products = await response.json();
            set({allProducts: products, loading: false});
        } catch (error) {
            set({error: `Failed to fetch all products: ${error.message}`, loading: false});
        }
    },

    /* Fetch products by category_id */
    fetchProductsByCategory: async (category, category_id) => {
        set({loading: true, error: null});
        try {
            const response = await fetch(`/api/products/categories/${category_id}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const products = await response.json();
            set((state) => ({
                productsByCategory: { ...state.productsByCategory, [category]: products },
                loading: false
            }));
        } catch (error) {
            set({error: `Failed to fetch products by category: ${category}: ${error.message}`, loading: false});
        }
    },

    /* Fetch product by id */
    fetchProductById: async (id) => {
        set({loading: true, error: null});
        try {
            const response = await fetch(`/api/products/${id}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const product = await response.json();
            set({selectedProduct: product, loading: false});
        } catch (error) {
            set({error: `Failed to fetch product with ID ${id}: ${error.message}`, loading: false});
        }
    },

    /* Clear selected product */
    clearSelectedProduct: () => set({selectedProduct: null}),
}));

export default useProductStore;