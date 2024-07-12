import { db } from '@/server/index';
import { products } from '@/server/schema';
import { handleError, methodNotAllowed, sendResponse } from '@/api/utils/apiHelpers';
import { eq } from 'drizzle-orm';

// GET product by id

export default async function getProductById(req, res) {

    if (req.method !== 'GET') return methodNotAllowed(res, req.method, 'GET')

    try {
        const { id } = req.query;
        const product = await db.select().from(products).where(eq(products.id, id));

        return product.length > 0
            ? sendResponse(res, 200, product)
            : handleError(res, 404, 'No products found');
    } catch (error) {
        return handleError(res, 500, 'Failed to retrieve products')
    }
}


