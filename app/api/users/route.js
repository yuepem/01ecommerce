import { db } from "@/server/index";
import { users } from "@/server/schema";
import { handleError, sendResponse } from "@/utils/apiHelpers";

// GET all users: ./api/users

export const GET = async (request) => {
  try {
    const allUsers = await db.select().from(users);

    return allUsers.length > 0
      ? sendResponse(200, allUsers)
      : handleError(404, "User not found");
  } catch (error) {
    return handleError(500, "Failed to retrieve user");
  }
};
