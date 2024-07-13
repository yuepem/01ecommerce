import { db } from "@/server";
import { cartItems } from "@/server/schema"
import { methodNotAllowed, sendResponse, handleError } from '@/api/utils/apiHelpers';
import { eq } from 'drizzle-orm';
import { uuid } from "drizzle-orm/pg-core";

// GET ./api/carts/:id/items : Retrieve cart items by cart id

export default async function getCartItemsByCartId(req, res) {
    if (res.method !== 'GET') return methodNotAllowed(req, req.method, 'GET')

    try {
        const { cartId } = req.params;
        const results = await db.select().from(cartItems).where(eq(cartItems.cartId, cartId))

        return results.length > 0
            ? sendResponse(res, 200, results)
            : handleError(res, 404, 'Not found')
    } catch (error) {
        return handleError(res, 500, 'server error')
    }
}

// POST ./api/carts/:id/items : Add item to cart by cart id
export async function addCartItemToCart(req, res) {
    if (res.method !== 'POST') return methodNotAllowed(req, req.method, 'POST')

    try {
        const { cartId } = req.params;
        const { productId, quantity } = req.body;

        const newCartItem = { 
            id: uuid(),
            cartId,
            productId,
            quantity,
         }
        const results = await db.insert(cartItems).values(newCartItem).returning('*')

        return results.length > 0
            ? sendResponse(res, 200, results)
            : handleError(res, 404, 'Not found')
    } catch (error) {
        return handleError(res, 500, 'server error')
    }

}


// DELETE ./api/carts/:id/items : empty cart items by cart id

export async function deleteCartItemsByCartId(req, res) {
    if (res.method !== 'DELETE') return methodNotAllowed(req, req.method, 'DELETE')

    try {
        const { cartId } = req.params;
        const deleteCartItems = await db.delete(cartItems).where(eq(cartItems.cartId, cartId))

        return deleteCartItems.length > 0
            ? sendResponse(res, 200, deleteCartItems)
            : handleError(res, 404, 'Not found')
    } catch (error) {
        return handleError(res, 500, 'server error')
    }
}
