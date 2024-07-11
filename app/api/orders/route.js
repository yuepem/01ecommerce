import { db } from '@/server/index';
import { orders } from '@/server/schema';
import { handleError, methodNotAllowed, sendResponse } from '@/api/utils/apiHelpers';


// ! For admin only 
//GET /api/orders : Retrieve all orders

export async function getAllOrders(req, res) {
    if (req.method !== 'GET') return methodNotAllowed(res, req.method, 'GET')

    try {
        const allOrders = await db.select().from(orders);

        return allOrders.length > 0
            ? sendResponse(res, 200, allOrders)
            : handleError(res, 404, 'No orders found')
    } catch (error) {
        return handleError(res, 500, 'Failed to retrieve orders')
    }
 }