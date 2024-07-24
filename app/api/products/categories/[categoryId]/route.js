import { db } from '@/server/index';
import { products } from '@/server/schema';
import { handleError, sendResponse } from '@/utils/apiHelpers';
import { eq } from 'drizzle-orm';

// GET all products by categoryId: './api/products/categories/:categoryId'

export const GET = async (req, {params}) => {
    const { categoryId } = params;

    if (!categoryId) return handleError(400, 'Invalid categoryId');

    try {
        const results = await db.select().from(products).where(eq(products.categoryId, categoryId));
        return results.length > 0
            ? sendResponse(200, results)
            : handleError(404, 'No products found');
    } catch (error) {
        return handleError(500, 'Failed to retrieve products')
    }
}