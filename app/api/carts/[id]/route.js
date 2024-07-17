import { db } from '@/server/index';
import { carts } from '@/server/schema';
import { handleError, sendResponse } from '@/utils/apiHelpers';
import { eq } from 'drizzle-orm';

// GET ./api/carts/:id : Retrieve cart by id

export const GET = async (req, {params} ) => {

    try {
        const { id } = params;
        const results = await db.select().from(carts).where(eq(carts.id, id)).limit(1);
        // console.log('results:', "route: GET /api/carts/:id", id);

        return results.length > 0
            ? sendResponse(200, results)
            : handleError(404, 'Cart not found');
    } catch (error) {
        return handleError(500, 'Failed to retrieve cart')
    }
}