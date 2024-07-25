import { db } from "@/server/index";
import { users } from "@/server/schema";
import { eq } from "drizzle-orm";
import { handleError, sendResponse } from "@/utils/apiHelpers";

// GET '/api/users/[id]' : Retrieve a specific user by ID.

export const GET = async (req, { params }) => {
  try {
    const { id } = params;

    const user = await db.select().from(users).where(eq(users.id, id));

    return user.length > 0
      ? sendResponse(200, user)
      : handleError(404, "User not found");
  } catch (error) {
    console.log("Error :", error);
    return handleError(500, "Failed to retrieve user");
  }
};

// PUT /api/users/[id] : Update a specific user by ID.

export const PUT = async (req, { params }) => {
  try {
    const { id } = params;

    const updateInfo = await req.json();

    if (!updateInfo || Object.keys(updateInfo).length === 0) {
      return handleError(400, "No data provided");
    }

    const updateUser = await db
      .update(users)
      .set(updateInfo)
      .where(eq(users.id, id))
      .returning();

    return updateUser.length > 0
      ? sendResponse(200, updateUser[0])
      : handleError(404, "User not found");
  } catch (error) {
    console.log("Error :", error);
    return handleError(500, "Failed to update user");
  }
};

// DELETE /api/users/[id] : Delete a specific user by ID.

export const DELETE = async (req, { params }) => {
  try {
    const { id } = params;
    const deleteUser = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning({ name: users.name });

    return deleteUser.length > 0
      ? sendResponse(204, "User deleted")
      : handleError(404, "User not found");
  } catch (error) {
    return handleError(500, "Failed to delete user");
  }
};
