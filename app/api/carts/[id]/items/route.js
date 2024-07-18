import { db } from "@/server/index";
import { cartItems } from "@/server/schema"
import { handleError, sendResponse } from '@/utils/apiHelpers';
import { eq, desc } from 'drizzle-orm';


// GET ./api/carts/:id/items : Retrieve cart items by cart id 

export const GET = async (req, { params }) => {

    try {
        const { id } = params;
        const results = await db.select().from(cartItems).where(eq(cartItems.cartId, id))

        return results.length > 0
            ? sendResponse(200, { 'Retrieved successfully': results },)
            : handleError(404, 'Not found')
    } catch (error) {
        return handleError(500, 'server error')
    }
}

// POST ./api/carts/:id/items : Add item to cart by cart id
export const POST = async (req, { params }) => {

    try {
        // Extract cartId from both params and query to ensure we get it
        const cartId = params?.id || req.nextUrl?.searchParams?.get('id');

        if (!cartId) {
            return handleError(400, 'No cart id provided');
        }

        // Parse the request body
        const body = await req.json();

        const productId = body.productId;
        const quantity = body.quantity;

        if (!productId || typeof quantity !== 'number' || quantity < 1) {
            return handleError(400, 'Invalid input. ProductId and a positive quantity are required.');
        }

        // Find the current highest ID
        const [lastItem] = await db
            .select({ id: cartItems.id })
            .from(cartItems)
            .orderBy(desc(cartItems.id))
            .limit(1);

        const lastId = lastItem?.id || 0;
        const newId = lastId + 1;

        const newCartItem = {
            id: newId,
            cartId,
            productId,
            quantity,
        };

        const results = await db.insert(cartItems).values(newCartItem).returning();

        return results.length > 0
            ? sendResponse(200, { 'Item added to cart successfully': results[0] })
            : handleError(500, 'Failed to add item to cart');
    } catch (error) {
        return handleError(500, `Server error: ${error.message}`);
    }
};


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
