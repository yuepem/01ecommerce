import { db } from "@/server/index";
import { cartItems } from "@/server/schema"
import { handleError, sendResponse } from '@/utils/apiHelpers';
import { eq } from 'drizzle-orm';

// GET ./api/carts/:id/items : Retrieve cart items by cart id

export const GET = async (req, {params}) => {

    try {
        const { id } = params;
        const results = await db.select().from(cartItems).where(eq(cartItems.cartId, id))

        return results.length > 0
            ? sendResponse(200, results)
            : handleError(404, 'Not found')
    } catch (error) {
        return handleError(500, 'server error')
    }
}

// POST ./api/carts/:id/items : Add item to cart by cart id
export async function POST(req, {params}) {

    try {
        const { id } = params;
        const { productId, quantity } = req.body;

        const newCartItem = {
            id: uuid(),
            id,
            productId,
            quantity,
        }
        const results = await db.insert(cartItems).values(newCartItem).returning('*')

        return results.length > 0
            ? sendResponse(200, results)
            : handleError(404, 'Not found')
    } catch (error) {
        return handleError(500, 'server error')
    }

}


// DELETE ./api/carts/:id/items : empty cart items by cart id

export async function DELETE(req) {

    try {
        const { id } = req.params;
        const deleteCartItems = await db.delete(cart_items).where(eq(cartItems.cartId, id))

        return deleteCartItems.length > 0
            ? sendResponse(200, deleteCartItems)
            : handleError(404, 'Not found')
    } catch (error) {
        return handleError(500, 'server error')
    }
}
