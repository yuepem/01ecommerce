

// GET /api/users/[id] : Retrieve a specific user by ID.

export default async function gteUserById(req, res) {
  const { id } = req.params;
  const user = await req.db.users.findOne({ where: { id } });
  res.json(user);

  return user;
}



// PUT /api/users/[id] : Update a specific user by ID.



// DELETE /api/users/[id] : Delete a specific user by ID.