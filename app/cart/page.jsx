"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import useCartStore from "@/store/cartStore";
import { getOrCreateCartId } from "@/utils/cartUtils";

export default function CartSide({ isCartOpen, setIsCartOpen }) {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    fetchCartItems
  } = useCartStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isCartOpen) {
      setIsLoading(true);
      const cartId = getOrCreateCartId();
      fetchCartItems(cartId).finally(() => setIsLoading(false));
    }
  }, [isCartOpen, fetchCartItems]);

  const handleUpdateQuantity = async (productId, delta) => {
    const cartId = getOrCreateCartId();
    const existingItem = items.find(item => item.productId === productId);
    if (!existingItem) return;

    const newQuantity = Math.max(0, existingItem.quantity + delta);

    try {
      if (newQuantity === 0) {
        await fetch(`/api/carts/${cartId}/items/${productId}`, { method: 'DELETE' });
        removeItem(productId);
      } else {
        const response = await fetch(`/api/carts/${cartId}/items/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity: newQuantity }),
        });
        if (response.ok) {
          const result = await response.json();
          updateQuantity(productId, result.item.quantity);
        }
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  return (
    <Dialog open={isCartOpen} onClose={setIsCartOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-slate-500 bg-opacity-70 transition duration-500 ease-in-out data-[closed]:opacity-10"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Shopping cart
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setIsCartOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      {isLoading ? (
                        <p>Loading cart items...</p>
                      ) : items && items.length > 0 ? (
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {items.map((item) => (
                            <li key={item.productId} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  alt={item.imageAlt}
                                  src={item.imageSrc}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{item.name}</h3>
                                    <p className="ml-4">
                                      ${item.price * item.quantity}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <div className="flex items-center">
                                    <button
                                      onClick={() => handleUpdateQuantity(item.productId, -1)}
                                      className="p-1 bg-gray-200 rounded"
                                    >
                                      <MinusIcon className="h-5 w-5" />
                                    </button>
                                    <span className="mx-2">{item.quantity}</span>
                                    <button
                                      onClick={() => handleUpdateQuantity(item.productId, 1)}
                                      className="p-1 bg-gray-200 rounded"
                                    >
                                      <PlusIcon className="h-5 w-5" />
                                    </button>
                                  </div>

                                  <div className="flex">
                                    <button
                                      type="button"
                                      onClick={() => removeItem(item.productId)}
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>Your cart is empty.</p>
                      )}
                    </div>
                  </div>
                </div>

                {items && items.length > 0 && (
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${getCartTotal().toFixed(2)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <Link
                        href="/checkoutPage"
                        className="flex items-center justify-center rounded-md border border-transparent bg-gray-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gradient-to-t from-indigo-300 via-indigo-400 to-indigo-500 transition-all duration-300 ease-in-out "
                      >
                        <button
                          type="button"
                          onClick={() => setIsCartOpen(false)}
                        >
                          Checkout
                        </button>
                      </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{" "}
                        <button
                          type="button"
                          onClick={() => setIsCartOpen(false)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}