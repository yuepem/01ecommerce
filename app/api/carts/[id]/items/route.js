import { db } from "@/server/index";
import { cartItems, carts } from "@/server/schema"
import { handleError, sendResponse } from '@/utils/apiHelpers';
import { eq } from 'drizzle-orm';

// Helper function to get or create a cart
const getOrCreateCart = async (cartId) => {
  try {
    const existingCarts = await db.select().from(carts).where(eq(carts.id, cartId));
    let cart = existingCarts[0];
    if (!cart) {
      const newCarts = await db.insert(carts).values({ id: cartId }).returning();
      cart = newCarts[0];
    }
    return cart;
  } catch (error) {
    console.error('Error in getOrCreateCart:', error);
    throw error;
  }
};

// POST ./api/carts/:id/items : Add item to cart by cart id
export const POST = async (req, { params }) => {
  try {
    const cartId = params?.id;

    if (!cartId) {
      return handleError(400, 'No cart id provided');
    }

    console.log('Received cartId:', cartId);

    // Ensure the cart exists
    await getOrCreateCart(cartId);

    // Parse the request body
    const body = await req.json();
    console.log('Received body:', body);

    const { productId, quantity } = body;

    if (!productId || typeof quantity !== 'number' || quantity < 1) {
      return handleError(400, 'Invalid input. ProductId and a positive quantity are required.');
    }

    // Check if the item already exists in the cart
    const existingItems = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.cartId, cartId))
      .where(eq(cartItems.productId, productId));
    const existingItem = existingItems[0];

    let result;
    if (existingItem) {
      // Update the quantity if the item already exists
      result = await db
        .update(cartItems)
        .set({ quantity: existingItem.quantity + quantity })
        .where(eq(cartItems.id, existingItem.id))
        .returning();
    } else {
      // Insert a new item if it doesn't exist
      result = await db
        .insert(cartItems)
        .values({ cartId, productId, quantity })
        .returning();
    }

    console.log('Operation result:', result);

    return result.length > 0
      ? sendResponse(200, { 'Item added to cart successfully': result[0] })
      : handleError(500, 'Failed to add item to cart');
  } catch (error) {
    console.error('Error in POST /api/carts/[id]/items:', error);
    return handleError(500, `Server error: ${error.message}`);
  }
};

// GET ./api/carts/:id/items : Retrieve cart items by cart id 

export const GET = async (req, { params }) => {

    try {
        const { id } = params;
        const results = await db.select().from(cartItems).where(eq(cartItems.cartId, id))

        return results.length > 0
            ? sendResponse(200, { 'Retrieved successfully': results },)
            : handleError(404, 'Not found')
    } catch (error) {
        console.log('Error :', error);
        return handleError(500, 'server error')
    }
}

// DELETE ./api/carts/:id/items : empty cart items by cart id

export async function DELETE(req, { params }) {

    try {
        const id = params?.id || req.nextUrl?.searchParams?.get('id');

        if (!id) {
            return handleError(400, 'No cart id provided');
        }
        
        const deleteCartItems = await db.delete(cartItems).where(eq(cartItems.cartId, id)).returning();

        return deleteCartItems.length > 0
            ? sendResponse(200,{
                'message': 'Deleted successful!', 
                'data': deleteCartItems
            })
            : handleError(404, 'Not found')
    } catch (error) {
        return handleError(500, 'server error')
    }
}

// Testing file

// Testing : POST is not defined

/* export const POST = async (req, { params }) => {
    // console.log('POST request received');
    // console.log('Params:', params);
    // console.log('Query:', req.nextUrl?.searchParams?.toString());

    let cartId, rawBody, productId, quantity, body;

    try {
        // Extract cartId from both params and query to ensure we get it
        cartId = params?.id || req.nextUrl?.searchParams?.get('id');
        console.log('Extracted cartId:', cartId);

        if (!cartId) {
            return handleError(400, 'No cart id provided');
        }

        // Parse the request body
        rawBody = await req.text();
        // console.log('Raw Request body:', rawBody);

        // Attempt to parse the JSON
        try {
            body = JSON.parse(rawBody);
        } catch (jsonError) {
            // console.error('JSON parsing error:', jsonError);
            return handleError(400, 'Invalid JSON in request body');
        }

        console.log('Parsed request body:', body);

        productId = body.productId;
        quantity = body.quantity;

        if (!productId || typeof quantity !== 'number' || quantity < 1) {
            return handleError(400, 'Invalid input. ProductId and a positive quantity are required.');
        }

        console.log('Attempting to add item to cart:', { cartId, productId, quantity });

        // Find the current highest ID
        const [lastItem] = await db
            .select({ id: cartItems.id })
            .from(cartItems)
            .orderBy(desc(cartItems.id))
            .limit(1);

        const lastId = lastItem?.id;
        const newId = lastId > 0 ? lastId + 1 : 1;

        const newCartItem = {
            id: newId,
            cartId,
            productId,
            quantity,
        }

        const results = await db.insert(cartItems).values(newCartItem).returning();

        return results.length > 0
            // ? sendResponse(200, { 'Item added to cart successfully': results[0] })
            : handleError(500, 'Failed to add item to cart');
    } catch (error) {
        console.error('Error in POST /api/carts/[id]/items:', error);
        console.error('Error occurred with these values:');
        console.error('cartId:', cartId);
        console.error('body:', body);
        console.error('productId:', productId);
        console.error('quantity:', quantity);
        return handleError(500, `Server error: ${error.message}`);
    }
} */