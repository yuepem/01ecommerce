
import { db } from '@/server/index';
import { orderItems } from '@/server/schema';
import { handleError, methodNotAllowed, sendResponse } from '@/utils/apiHelpers';
import { eq } from 'drizzle-orm';


// # [A/U] GET /api/orderItems/[orderId] : Retrieve order items from [orderItems] by order id

export default async function getOrderItemsByOrderId(req, res) {
    if (req.method !== 'GET') return methodNotAllowed(res, req.method, 'GET')

    try {
        const { orderId } = req.params;

        const results = await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));

        return results.length > 0
            ? sendResponse(res, 200, results)
            : handleError(res, 404, 'Order items not found');
    } catch (error) {
        return handleError(res, 500, 'Failed to retrieve order items')
    }
}