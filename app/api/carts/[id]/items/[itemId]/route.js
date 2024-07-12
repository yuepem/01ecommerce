import { db } from "@/server";
import { cartItems } from "@/server/schema"
import { methodNotAllowed, sendResponse, handleError } from '@/api/utils/apiHelpers';
import { eq } from 'drizzle-orm';

// PUT './app/api/carts/items/:id' : update item information (quantity)
// q: when the quantity had updated on client, how to update the quantity in the database? call this api every time the quantity changes?
// a: yes, call this api every time the quantity changes

export default async function updateCartItemById(req, res) {
    if (res.method !== 'PUT') return methodNotAllowed(req, req.method, 'PUT')

    try {
        const { id, itemId } = req.params;
        const updateInfo = req.body;

        if (Object.keys(updateInfo).length === 0) {
            return handleError(res, 400, 'No data provided');
        }

        const updateCartItem = await db.update(cartItems)
            .set(updateInfo)
            .where(eq(cartItems.itemId, itemId))
            .returning('*');

        return updateCartItem.length > 0
            ? sendResponse(res, 200, updateCartItem[0])
            : handleError(res, 404, 'Item not found');
    } catch (error) {
        return handleError(res, 500, 'Failed to update item');
    }
}