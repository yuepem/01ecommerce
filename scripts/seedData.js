
import { db } from '../server/index.js';

import { fakeUsersAndAddresses, fakeCategoriesAndProducts, OrderItemsHelper, fakeOrdersAndOrderItems, fakeCartsAndCartItems, fakeAccounts } from './faker.js';


const { users, addresses } = fakeUsersAndAddresses();
const { categories, products } = fakeCategoriesAndProducts();
const orderItemsHelper = new OrderItemsHelper(products);
const { orders, orderItems } = fakeOrdersAndOrderItems(users, orderItemsHelper);
const { carts, cartItems } = fakeCartsAndCartItems(users, products);
const accounts = fakeAccounts(users);

const seedDatabase = async () => {
    try {
        await db.delete(users);
        await db.delete(addresses);
        await db.delete(categories);
        await db.delete(products);
        await db.delete(orders);
        await db.delete(orderItems);
        await db.delete(carts);
        await db.delete(cartItems);
        await db.delete(accounts);

        await db.insert(users).values(users).returning();
        await db.insert(addresses).values(addresses).returning();
        await db.insert(categories).values(categories).returning();
        await db.insert(products).values(products).returning();
        await db.insert(orders).values(orders).returning();
        await db.insert(orderItems).values(orderItems).returning();
        await db.insert(carts).values(carts).returning();
        await db.insert(cartItems).values(cartItems).returning();
        await db.insert(accounts).values(accounts).returning();

        console.log('Database seeded successfully');
    } catch (error) {
        console.error(error);
    }
}

// Check if the file is being run directly
if (require.main === module) {
    seedDatabase()
        .then(() => console.log('Database seeded successfully.'))
        .catch((error) => console.error('Failed to seed database:', error));
}