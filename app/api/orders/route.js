import { db } from "@/server/index";
import { orders } from "@/server/schema";
import { handleError, sendResponse } from "@/utils/apiHelpers";

// ! For admin only
//GET /api/orders : Retrieve all orders

export const GET = async (request) => {
  try {
    const allOrders = await db.select().from(orders);

    return allOrders.length > 0
      ? sendResponse(200, allOrders)
      : handleError(404, "No orders found");
  } catch (error) {
    return handleError(500, "Failed to retrieve orders");
  }
};


/* export const POST = async (request) => {
  try {
    const newOrder = await request.json();
    const order = await db.insert(orders).values(newOrder).returning();

    return order.length > 0
      ? sendResponse(201, order[0])
      : handleError(400, "Failed to create order");
  } catch (error) {
    return handleError(500, "Failed to create order");
  }
} */