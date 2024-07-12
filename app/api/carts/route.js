import { db } from '@/server/index';
import { carts } from '@/server/schema';
import { methodNotAllowed, sendResponse, handleError } from '@/api/utils/apiHelpers';


// # [A] GET: Retrieve all carts,[U] POST: Create a new cart

export async function getAllCarts(req, res) {
    if (req.method !== 'GET') return methodNotAllowed(res, req.method, 'GET')

    try {
        const results = await db.select().from(carts);

        return results.length > 0
            ? sendResponse(res, 200, results)
            : handleError(res, 404, 'Carts not found');
    } catch (error) {
        return handleError(res, 500, 'Failed to retrieve carts')
    }
}

// [A] testing : GET all users' carts

// import { getCartByUserId, getCartItems } from '@/server/db/carts';


export async function getAllUsersCarts(req, res) {
    /* const userId = req.session.userId;

    if (!userId) {
        return res.status(401).send('User not authenticated');
    } */

    try {
        const cart = await getCartByUserId(userId);
        const cartItems = await getCartItems(cart.id);

        const results = {
            cartId: cart.id,
            userId: cart.user_id,
            items: cartItems,
            total: cartItems.reduce((acc, item) => acc + item.total_price, 0)
        };

        return results.length > 0
            ? sendResponse(res, 200, results)
            : handleError(res, 404, 'Cart not found');
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}