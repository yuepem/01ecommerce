import { db } from '@/server/index';
import { users } from '@/server/schema';

// GET /api/users/[id] : Retrieve a specific user by ID.

export default async function getUserById(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } else {
    try {
      const { id } = req.params;
      const user = await db.select().from('users').where(eq(users.id, id));
      if (user) {
        res.status(200).json(user);
      }

      res.status(404).json({ error: 'User not found' });

    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  }
}



// PUT /api/users/[id] : Update a specific user by ID.

export default async function updateUserById(req, res) {
  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } else {
    try {
      const { id } = req.params;
      const updateInfo = req.body
      if (Object.keys(updateInfo).length === 0) {
        res.status(400).json({ error: 'No data provided' });
      }

      const updateUser = await db.update(users)
        .set(updateInfo)
        .where(eq(users.id, id))
        .returning('*')

      if (updateUser.length > 0) {
        res.status(200).json(updateUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  }
}



// DELETE /api/users/[id] : Delete a specific user by ID.

export default async function deleteUserById(req, res) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } else {
    try {
      const { id } = req.params;
      const deleteUser = await db.delete(users).where(eq(users.id, id)).returning({ name: users.name })
      if (deleteUser.length > 0) {
        res.status(204).json("User deleted");
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }
}