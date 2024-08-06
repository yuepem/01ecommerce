import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],

            /* add item to cart or increase item quantity */
            addItem: (productId, quantity = 1) => set((state) => {
                const existingItem = state.items.find(item => item.productId === productId);
                if (existingItem) {
                    return {
                        items: state.items.map(item =>
                            item.productId === productId
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        )
                    };
                } else {
                    return {
                        items: [...state.items, { productId, quantity }]
                    };
                }
            }),

            /* remove item from cart */
            removeItem: (productId) => set((state) => ({
                items: state.items.filter(item => item.productId !== productId)
            })),


            /* update items' quantity */
            updateQuantity: (productId, quantity) => set((state) => ({
                items: state.items.map(item =>
                    item.productId === productId
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
                const count = get().items.reduce((total, item) => total + item.quantity, 0);
                console.log('Current cart item count:', count);
                return count;
            },

            fetchCartItems: async (cartId) => {
                try {
                    console.log('Fetching cart items for cartId:', cartId);
                    const response = await fetch(`/api/carts/${cartId}/items`);
                    if (response.ok) {
                        const data = await response.json();
                        console.log('Fetched cart items:', data.items);
                        set({ items: data.items || [] });
                    } else {
                        throw new Error('Failed to fetch cart items');
                    }
                } catch (error) {
                    console.error('Error fetching cart items:', error);
                    set({ items: [] });
                }
            },
        }),

        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)

export default useCartStore;