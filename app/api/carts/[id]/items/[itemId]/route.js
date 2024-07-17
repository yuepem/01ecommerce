import { db } from "@/server";
import { cart_items } from "@/server/schema"
import { handleError, sendResponse } from '@/utils/apiHelpers';
import { eq } from 'drizzle-orm';

// PUT './app/api/carts/items/:id' : update item information (quantity)

// q: when the quantity had updated on client, how to update the quantity in the database? call this api every time the quantity changes?
// a: yes, call this api every time the quantity changes

export default async function PUT(req) {

    try {
        const { itemId } = req.params;
        const updateInfo = req.body;

        if (Object.keys(updateInfo).length === 0) {
            return handleError(400, 'No data provided');
        }

        const updateCartItem = await db.update(cart_items)
            .set(updateInfo)
            .where(eq(cart_items.item_id, itemId))
            .returning('*');

        return updateCartItem.length > 0
            ? sendResponse(200, updateCartItem[0])
            : handleError(404, 'Item not found');
    } catch (error) {
        return handleError(500, 'Failed to update item');
    }
}