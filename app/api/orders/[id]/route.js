import { db } from "@/server/index";
import { orders } from "@/server/schema";
import { sendResponse, handleError } from "@/utils/apiHelpers";
import { eq } from "drizzle-orm";

// GET /api/orders/[id] : Retrieve order by id

export const GET = async (req, { params }) => {
  try {
    const { id } = params;
    const results = await db.select().from(orders).where(eq(orders.id, id));

    return results.length > 0
      ? sendResponse(200, results)
      : handleError(404, "Order not found");
  } catch (error) {
    return handleError(500, "Failed to retrieve order");
  }
};

// !! For admin only!!
// PUT /api/orders/[id] : Update order status by id ([cancelled] for both user and admin), but only admin can update order status to [paid or done]

export const PUT = async (req, { params }) => {
  try {
    const { id } = params;
    if (!id) {
      return handleError(400, "No order ID provided");
    }

    const updateInfo = await req.json();

    if (Object.keys(updateInfo).length === 0) {
      return handleError(res, 400, "No data provided");
    }

    const updateOrder = await db
      .update(orders)
      .set(updateInfo)
      .where(eq(orders.id, id))
      .returning();

    return updateOrder.length > 0
      ? sendResponse(200, updateOrder[0])
      : handleError(404, "Order not found");
  } catch (error) {
    return handleError(500, "Failed to update order");
  }
};

// !! For admin only!!
// DELETE /api/orders/[id] : Delete order by id (only admin can delete order)

export const DELETE = async (req, { params }) => {
  try {
    const { id } = params;
    if (!id) {
      return handleError(400, "No order ID provided");
    }

    const deleteOrder = await db
      .delete(orders)
      .where(eq(orders.id, id))
      .returning({ order_id: orders.id });

    return deleteOrder.length > 0
      ? sendResponse(200, deleteOrder)
      : handleError(404, "Order not found");
  } catch (error) {
    console.log('Error deleting order:', error);
    return handleError(500, "Failed to delete order");
  }
};
