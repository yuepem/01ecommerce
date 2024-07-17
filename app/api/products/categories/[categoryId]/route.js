import { db } from '@/server/index';
import { products } from '@/server/schema';
import { handleError, methodNotAllowed, sendResponse } from '@/utils/apiHelpers';
import { eq } from 'drizzle-orm';

// GET all products by categoryId

export default async function getProductsByCategoryId(req, res) {
    const { categoryId } = req.query;

    if (req.method !== 'GET') return methodNotAllowed(res, req.method, 'GET')

    try {
        const results = await db.select().from(products).where(eq(products.categoryId, categoryId));
        return results.length > 0
            ? sendResponse(res, 200, results)
            : handleError(res, 404, 'No products found');
    } catch (error) {
        return handleError(res, 500, 'Failed to retrieve products')
    }
}