import { faker } from '@faker-js/faker';

export function createFakeUser() {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

export function createFakeAddress() {
  return {
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zipCode: faker.address.zipCode(),
  };
}

