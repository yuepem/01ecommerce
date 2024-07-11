import { db } from '@/server/index';
import { products } from '@/server/schema';
import { handleError, methodNotAllowed, sendResponse } from '@/api/utils/apiHelpers';

// GET /api/products : Retrieve all products.
export default async function getAllProducts(req, res) {
    if (req.method !== 'GET') return methodNotAllowed(res, req.method, 'GET')

    try {
        const allProducts = await db.select().from(products);
        return allProducts.length > 0
            ? sendResponse(res, 200, allProducts)
            : handleError(res, 404, 'No products found');
    } catch (error) {
        return handleError(res, 500, 'Failed to retrieve products')
    }
}
