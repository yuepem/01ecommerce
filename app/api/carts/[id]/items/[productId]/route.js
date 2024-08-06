import { db } from "@/server/index";
import { cartItems } from "@/server/schema";
import { handleError, sendResponse } from '@/utils/apiHelpers';
import { eq, and } from 'drizzle-orm';

export async function PUT(req, { params }) {
  try {
    const { id: cartId, productId } = params;
    const { quantity } = await req.json();

    if (!cartId || !productId || typeof quantity !== 'number') {
      return handleError(400, 'Invalid input');
    }

    const updatedItems = await db
      .update(cartItems)
      .set({ quantity })
      .where(
        and(
          eq(cartItems.cartId, cartId),
          eq(cartItems.productId, parseInt(productId))
        )
      )
      .returning();

    if (updatedItems.length === 0) {
      return handleError(404, 'Cart item not found');
    }

    return sendResponse(200, { item: updatedItems[0] });
  } catch (error) {
    console.error('Error updating cart item:', error);
    return handleError(500, 'Server error');
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id: cartId, productId } = params;

    if (!cartId || !productId) {
      return handleError(400, 'Invalid input');
    }

    const deletedItems = await db
      .delete(cartItems)
      .where(
        and(
          eq(cartItems.cartId, cartId),
          eq(cartItems.productId, parseInt(productId))
        )
      )
      .returning();

    if (deletedItems.length === 0) {
      return handleError(404, 'Cart item not found');
    }

    return sendResponse(200, { message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    return handleError(500, 'Server error');
  }
}