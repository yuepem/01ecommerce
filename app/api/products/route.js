import { db } from '@/server/index';
import { products } from '@/server/schema';
import { handleError, sendResponse } from '@/utils/apiHelpers';

// GET /api/products : Retrieve all products.
export const GET = async (request) => {
    try {
        const allProducts = await db.select().from(products);

        return allProducts.length > 0
            ? sendResponse( 200, allProducts)
            : handleError( 404, 'No products found');
    } catch (error) {
        return handleError(500, 'Failed to retrieve products')
    }
}
