import { db } from '../server/index.js';
import * as schema from '../server/schema.js';

import { createFakeUser, createFakeAddress } from './factories.js';

async function seedDatabase() {
    // Clear existing data <optional>.
    await db.delete(posts);
    await db.delete(users);

    // Create users
    const fakeUsers = Array.from({ length: 10 }, createFakeUser);
    const insertedUsers = await db.insert(users).values(fakeUsers).returning();

    // Create posts for each user
    const fakePosts = insertedUsers.flatMap(user =>
        Array.from({ length: 5 }, () => createFakePost(user.id))
    );
    await db.insert(posts).values(fakePosts);

    console.log('Database seeded successfully');
}

seedDatabase().catch(console.error);