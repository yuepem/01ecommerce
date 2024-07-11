import { db } from '@/server/index';
import { categories } from '@/server/schema';
import { handleError, methodNotAllowed, sendResponse } from '@/api/utils/apiHelpers';

// GET /api/categories : Retrieve all categories.

export default async function getAllCategories(req, res) {
    if (req.method !== 'GET') return methodNotAllowed(res, req.method, 'GET')
    
    try {
        const allCategories = await db.select().from(categories);
        return allCategories.length > 0 
            ? sendResponse(res, 200, allCategories)
            : handleError(res, 404, 'No categories found')
    } catch (error) {
        return handleError(res, 500, 'Failed to retrieve categories')
    }
}