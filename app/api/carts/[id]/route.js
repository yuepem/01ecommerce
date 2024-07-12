import { db } from '@/server/index';
import { carts } from '@/server/schema';
import { methodNotAllowed, sendResponse, handleError } from '@/api/utils/apiHelpers';
import { eq } from 'drizzle-orm';

// GET ./api/carts/:id : Retrieve cart by id

export async function getCartById(req, res) {
    if (req.method !== 'GET') return methodNotAllowed(res, req.method, 'GET')

    try {
        const { id } = req.params;
        const results = await db.select().from(carts).where(eq(carts.id, id));

        return results.length > 0
            ? sendResponse(res, 200, results)
            : handleError(res, 404, 'Cart not found');
    } catch (error) {
        return handleError(res, 500, 'Failed to retrieve cart')
    }
}