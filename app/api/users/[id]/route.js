import { db } from '@/server/index';
import { users } from '@/server/schema';
import { eq } from 'drizzle-orm';

import { handleError, methodNotAllowed, sendResponse } from '@/api/utils/apiHelpers';


// GET /api/users/[id] : Retrieve a specific user by ID.

export async function getUserById(req, res) {
  if (req.method !== 'GET') return methodNotAllowed(res, req.method, 'GET')

  try {
    const { id } = req.params;
    const user = await db.select().from('users').where(eq(users.id, id));
    return user.length > 0
      ? sendResponse(res, 200, user)
      : handleError(res, 404, 'User not found')

  } catch (error) {
    return handleError(res, 500, 'Failed to retrieve user')
  }
}

// PUT /api/users/[id] : Update a specific user by ID.

export async function updateUserById(req, res) {
  if (req.method !== 'PUT') return methodNotAllowed(res, req.method, 'PUT');

  try {
    const { id } = req.params;
    const updateInfo = req.body;

    if (Object.keys(updateInfo).length === 0) {
      return handleError(res, 400, 'No data provided');
    }

    const updateUser = await db.update(users)
      .set(updateInfo)
      .where(eq(users.id, id))
      .returning('*');

    return updateUser.length > 0
      ? sendResponse(res, 200, updateUser[0])
      : handleError(res, 404, 'User not found');
  } catch (error) {
    return handleError(res, 500, 'Failed to update user');
  }
}

// DELETE /api/users/[id] : Delete a specific user by ID.

export async function deleteUserById(req, res) {
  if (req.method !== 'DELETE') return methodNotAllowed(res, req.method, 'DELETE');

  try {
    const { id } = req.params;
    const deleteUser = await db.delete(users)
      .where(eq(users.id, id))
      .returning({ name: users.name });

    return deleteUser.length > 0
      ? sendResponse(res, 204, 'User deleted')
      : handleError(res, 404, 'User not found');
  } catch (error) {
    return handleError(res, 500, 'Failed to delete user');
  }
}
