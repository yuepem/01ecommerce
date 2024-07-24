import { db } from '@/server/index';
import { products } from '@/server/schema';
import { handleError, sendResponse } from '@/utils/apiHelpers';
import { eq } from 'drizzle-orm';

// GET product by id: './api/products/:id'

export const GET = async(req, {params})=> {

    try {
        const { id } = params;
        const product = await db.select().from(products).where(eq(products.id, id));

        return product.length > 0
            ? sendResponse( 200, product)
            : handleError( 404, 'No products found');
    } catch (error) {
        return handleError( 500, 'Failed to retrieve products')
    }
}


