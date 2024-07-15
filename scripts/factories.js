import { faker } from '@faker-js/faker';

// Initialize counters for serial IDs
let addressIdCounter = 1;
let categoryIdCounter = 1;
let productIdCounter = 1;
let orderItemIdCounter = 1;
let cartItemIdCounter = 1;

// Helper function to generate UUIDs
const generateUUID = () => faker.string.uuid();

// create fake data for Users
export const createFakeUser = () => {
  const userId = generateUUID();
  return {
    id: userId,
    name: faker.person.firstName(),
    phoneNumber: faker.phone.number(),
    email: faker.internet.email(),
    passwordHash: faker.internet.password(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
}

// create fake data for Addresses
export const createFakeAddress = (userId) => {
  return {
    id: addressIdCounter++,
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    userId: userId,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
}


// create fake data for Categories 

export const createFakeCategory = () => {
  const categoryId = categoryIdCounter++;
  return {
    id: categoryId,
    name: faker.commerce.department(),
    description: faker.commerce.productDescription(),
  };
}

// create fake data for Products

export const createFakeProduct = (categoryId) => {
  return {
    id: productIdCounter++,
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    stock: faker.random.number(),
    categoryId: categoryId,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
}


// create fake data for Orders

export const createFakeOrder = (userId) => {
  return {
    id: generateUUID(),
    userId: userId,
    status: faker.random.arrayElement(['pending', 'shipped', 'delivered']),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
}

// create fake data for OrderItems

export const createFakeOrderItem = (orderId, productId) => {
  const product = faker.helpers.arrayElement(products);
  const quantity = faker.number.int({ min: 1, max: 10 });
  const price = product.price * quantity;
  return {
    id: orderItemIdCounter++,
    orderId: orderId,
    productId: productId,
    quantity: quantity,
    price: price,
  };
}