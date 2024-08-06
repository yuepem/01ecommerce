import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],

            /* add item to cart or increase item quantity */
            addItem: (productId) => set((state) => {
                const existingItem = state.items.find(item => item.id === productId);
                if (existingItem) {
                    return {
                        items: state.items.map(item =>
                            item.id === productId
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    };
                } else {
                    return {
                        items: [...state.items, { ...productId, quantity: 1 }]
                    };
                }
            }),


            /* remove item from cart */
            removeItem: (productId) => set((state) => ({
                items: state.items.filter(item => item.id !== productId)
            })),


            /* update items' quantity */
            updateQuantity: (productId, quantity) => set((state) => ({
                items: state.items.map(item =>
                    item.id === productId
                        ? { ...item, quantity }
                        : item
                )
            })),

            /* Clear cart */
            clearCart: () => set({ items: [] }),

            /* getCartTotal */
            getCartTotal: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),

            /* cart items count */
            getCartItemsCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0);
            },

        }),

        {
            name: 'cart-storage',
            GetStorage: () => localStorage,
        }
    )
)

export default useCartStore;