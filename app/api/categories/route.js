import { db } from '@/server/index';
import { categories } from '@/server/schema';
import { handleError, methodNotAllowed, sendResponse } from '@/utils/apiHelpers';

// GET /api/categories : Retrieve all categories.


export async function GET(request) {
    try {
        const allCategories = await db.select().from(categories);
        return allCategories.length > 0
            ? sendResponse(200, allCategories)
            : handleError(404, 'No categories found');
    } catch (error) {
        return handleError(500, 'Failed to retrieve categories');
    }
}