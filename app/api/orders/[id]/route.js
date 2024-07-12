import { db } from  '@/server/index';
import { orders } from '@/server/schema';
import { methodNotAllowed, sendResponse, handleError } from '@/api/utils/apiHelpers';
import { eq } from 'drizzle-orm';

// GET /api/orders/[id] : Retrieve order by id

export async function getOrderById(req, res) {
    if (res.method !== 'GET') return methodNotAllowed(res, req.method, 'GET')

    try {
        const { id } = req.params;
        const results = await db.select().from(orders).where(eq(orders.id, id));

        return results.length > 0
            ? sendResponse(res, 200, results)
            : handleError(res, 404, 'Order not found')
    } catch (error) {
        return handleError(res, 500, 'Failed to retrieve order')
    }
}


// !! For admin only!!
// PUT /api/orders/[id] : Update order status by id ([cancelled] for both user and admin), but only admin can update order status to [paid or done]

export async function updateOrderById(req, res) {
    if (req.method !== 'PUT') return methodNotAllowed(res, req.method, 'PUT')

    try {
        const { id } = req.params;
        const updateInfo = req.body;

        if (Object.keys(updateInfo).length === 0) {
            return handleError(res, 400, 'No data provided');
        }

        const updateOrder = await db.update(orders)
            .set(updateInfo)
            .where(eq(orders.id, id))
            .returning('*');

        return updateOrder.length > 0
            ? sendResponse(res, 200, updateOrder[0])
            : handleError(res, 404, 'Order not found');
    } catch (error) {
        return handleError(res, 500, 'Failed to update order');
    }

}

// !! For admin only!!
// DELETE /api/orders/[id] : Delete order by id (only admin can delete order)

export default async function deleteOrderById(req, res) {
    if (req.method !== 'DELETE') return methodNotAllowed(res, req.method, 'DELETE')

    try {
        const { id } = req.params;
        const deleteOrder = await db.delete(orders)
            .where(eq(orders.id, id))
            .returning({ order_id: orders.id });

        return deleteOrder.length > 0
            ? sendResponse(res, 200, deleteOrder)
            : handleError(res, 404, 'Order not found');
    } catch (error) {
        return handleError(res, 500, 'Failed to delete order');
    }
}





                                                        
