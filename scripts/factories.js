import { faker } from '@faker-js/faker';


const users = createFakeUser();
// const addresses = createFakeAddress();
const orders = createFakeOrders();
// const orderItems = createFakeOrderItems();
const carts = createFakeCarts();
//const cartItems = createFakeCartItems();
const products = createFakeProducts();
const categories = createFakeCategories();
// const accounts = createAccounts();

// Create a fake User info
export function createFakeUser() {
  return {
    id: faker.string.uuid(),
    name: faker.person.firstName(),
    phoneNumber: faker.phone.phoneNumber(),
    email: faker.internet.email({name: faker.person.firstName()}),
    passwordHash: faker.internet.password(),
    createAt: faker.date.recent(), 
    updateAt: faker.date.recent(),
  };
}

// create fake address
export function createFakeAddress() {
  return {
    id : faker.string.uuid(),
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    userId: users.id, // ! reference to user id
    createAt: faker.date.recent(),
    updateAt: faker.date.recent(),
  };
}

// create fake Accounts

export function createAccounts() {
  return {
    id: faker.string.uuid(),
    userId: users.id,
    type: faker.helpers.arrayElement(['user', 'admin']),
    provider: faker.internet.domainName(),
    providerAccountId: faker.internet.domainName(),
    refreshToken: faker.internet.password(),
    accessToken: faker.internet.password(),
    expiresAt: faker.date.recent(),
    tokenType: faker.helpers.arrayElement(['Bearer', 'JWT']),
    scope: faker.helpers.arrayElement(['read', 'write']),
    idToken: faker.internet.password(),
    sessionState: faker.internet.password(),
  };
helpers
}
// create fake categories

export function createFakeCategories() {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.department(),
    description: faker.lorem.sentence(),
  };

}

// create fake products

export function createFakeProducts() {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    stock: faker.number(),
    categoryId: categories.id, // ! reference to category id
  }
}

// create fake orders

export function createFakeOrders() {
  return {
    id: faker.string.uuid(),
    userId: users.id,
    status: faker.helpers.arrayElement(['pending', 'completed', 'cancelled']),
    total: faker.commerce.price(), // ! how to calculate total price of the order
    createAt: faker.date.recent(),
    updateAt: faker.date.recent(),
  };
}

// create fake order items
export function createFakeOrderItems() {
  return {
    id: faker.string.uuid(),
    orderId: orders.id, // ! reference to order id
    productId: products.id, // ! reference to product id
    quantity: faker.number({min: 1, max: 10}),
    price: products.price, // ! reference to product price
  };
}


// create fake carts
export function createFakeCarts() {
  return {
    id: faker.string.uuid(),
    userId: users.id, // ! reference to user id
    createAt: faker.date.recent(),
    updateAt: faker.date.recent(),
  };
}


// create fake cart items

export function createFakeCartItems() {
  return {
    id: faker.string.uuid(),
    cartId: carts.id, // ! reference to cart id
    productId: products.id, // ! reference to product id
    quantity: faker.number(),
  }
}



