import { faker } from '@faker-js/faker';
// const faker = require('@faker-js/faker');


// Initialize counters for serial IDs
let addressIdCounter = 1;
let categoryIdCounter = 1;
let productIdCounter = 1;
let orderItemIdCounter = 1;
let cartItemIdCounter = 1;


// Generate Users and Addresses

export const fakeUsersAndAddresses = () => {
    const users = [];
    const addresses = [];

    for (let i = 0; i < 10; i++) {
        const userId = faker.string.uuid();
        const user = {
            id: userId,
            name: faker.person.firstName(),
            phoneNumber: faker.phone.number(),
            email: faker.internet.email(),
            passwordHash: faker.internet.password(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
        };
        users.push(user);

        const address = {
            id: addressIdCounter++,
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zipCode: faker.location.zipCode(),
            userId: userId,
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
        };
        addresses.push(address);
    }
}


// Generate Categories and Products

export const fakeCategoriesAndProducts = () => {
    const categories = [];
    const products = [];

    for (let i = 0; i < 5; i++) {
        const categoryId = categoryIdCounter++;
        const category = {
            id: categoryId,
            name: faker.commerce.department(),
            description: faker.commerce.productDescription(),
        };
        categories.push(category);

        for (let j = 0; j < 10; j++) {
            const productId = productIdCounter++;
            const product = {
                id: productId,
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: faker.commerce.price({ min: 49, max: 999, symbol: '$' }),
                stock: faker.number.int({ min: 1, max: 100 }),
                categoryId: categoryId,
                createdAt: faker.date.past(),
                updatedAt: faker.date.recent(),
            };
            products.push(product);
        }
    }
}



// Helper function to generate fake order items and calculate total price

export function OrderItemsHelper(orderId, products) {
    const numberOfOrderItems = faker.number.int({ min: 1, max: 5 });
    let totalPrice = 0;
    const items = [];

    for (let i = 0; i < numberOfOrderItems; i++) {
        const product = faker.helpers.arrayElement(products);
        const quantity = faker.number.int({ min: 1, max: 10 });
        const price = product.price * quantity;
        totalPrice += price;

        items.push({
            id: orderItemIdCounter++,
            orderId: orderId,
            productId: product.id,
            quantity: quantity,
            price: price,
        });
    }

    return { items, totalPrice };
}

// Generate Orders and Order Items

export const fakeOrdersAndOrderItems = (users, products) => {
    const orders = [];
    const orderItems = [];

    for (let i = 0; i < 10; i++) {
        const userId = faker.helpers.arrayElement(users).id;
        const orderId = faker.string.uuid();
        const { items, totalPrice } = OrderItemsHelper(orderId, products);

        const order = {
            id: orderId,
            userId: userId,
            status: faker.helpers.arrayElement(['pending', 'paid', 'done', 'customer_canceled']),
            total: totalPrice,
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
        };
        orders.push(order);
        orderItems.push(...items);
    }
}


// Generate Carts and Cart Items

export const fakeCartsAndCartItems = (users, products) => {
    const carts = [];
    const cartItems = [];

    for (let i = 0; i < 5; i++) {
        const userId = faker.helpers.arrayElement(users).id;
        const cartId = faker.string.uuid();

        const cart = {
            id: cartId,
            userId: userId,
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
        };
        carts.push(cart);

        for (let j = 0; j < 5; j++) {
            const product = faker.helpers.arrayElement(products);
            const quantity = faker.number.int({ min: 1, max: 10 });

            const cartItem = {
                id: cartItemIdCounter++,
                cartId: cartId,
                productId: product.id,
                quantity: quantity,
                addedAt: faker.date.recent(),
            };
            cartItems.push(cartItem);
        }
    }
}


// Generate Accounts

export const fakeAccounts = (users) => {
    const accounts = [];

    for (let i = 0; i < 10; i++) {
        const userId = faker.helpers.arrayElement(users).id;
        const accountId = faker.string.uuid();
        const account = {
            id: accountId,
            userId: userId,
            type: faker.helpers.arrayElement(['user', 'admin']),
            provider: faker.company.name(),
            providerAccountId: faker.string.uuid(),
            refreshToken: faker.internet.password(),
            accessToken: faker.internet.password(),
            expiresAt: faker.date.future(),
            tokenType: faker.string.nanoid(),
            scope: faker.string.alpha(10),
            idToken: faker.internet.password(),
            sessionState: faker.string.alpha(10),
        };
        accounts.push(account);
    }
}


