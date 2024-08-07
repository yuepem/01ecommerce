import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getProductById } from '@/utils/query';


const useCartStore = create(
    persist(
        (set) => ({
            cartItems: [],

            addToCart: (productId) => set((state) => {
                const existingItem = state.cartItems.find(item => item.id === productId)
                const product = getProductById(productId);
                if (existingItem) {
                    return { cartItems: state.cartItems.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item) }
                }
                return {
                    cartItems: [...state.cartItems, { ...product, quantity: 1 }]
                }
            }),

            updateCartItemQuantity: (productId, quantity) => set((state) => {
                return {
                    cartItems: state.cartItems.map(item => item.id === productId ? { ...item, quantity: quantity } : item)
                }
            }),


            removeFromCart: (productId) => {
                set((state) => {
                    return {
                        cartItems: state.cartItems.filter(item => item.id !== productId),
                    }
                });
            },
            clearCart: () => {
                set({ cartItems: [] });
            },

            getCartTotal: (cartItems) => {
                return cartItems.reduce((acc, item) => acc + item.price, 0);
            },

            getCartCount: (cartItems) => {
                return cartItems.reduce((acc, item) => acc + item.quantity, 0);
            },
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useCartStore;