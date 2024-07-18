import { db } from "@/server";
import { cartItems } from "@/server/schema"
import { handleError, sendResponse } from '@/utils/apiHelpers';
import { eq } from 'drizzle-orm';

// PUT './app/api/carts/items/:id' : update item information (quantity)

// q: when the quantity had updated on client, how to update the quantity in the database? call this api every time the quantity changes?
// a: yes, call this api every time the quantity changes


export const PUT = async (req, { params }) => {
    try {

        const itemId = params?.itemId || req.nextUrl?.searchParams?.get('itemId');

        if (!itemId) {
            return handleError(400, 'No item ID provided');
        }

        const updateInfo = await req.json();
        
        // console.log('updateInfo:', updateInfo);

        if (!updateInfo || Object.keys(updateInfo).length === 0) {
            return handleError(400, 'No data provided to update');
        }


        const updateCartItem = await db.update(cartItems)
            .set(updateInfo)
            .where(eq(cartItems.id, itemId))
            .returning();

        return updateCartItem.length > 0
            ? sendResponse(200, updateCartItem[0])
            : handleError(404, 'Item not found');
    } catch (error) {
        return handleError(500, `Failed to update item: ${error.message}`);
    }
};