export function validateUser(req, res, next) {
  const { name } = req.body;
  if (!name || name.trim().length < 3) {
    return res
      .status(400)
      .json({ error: "Name is required and must have at least 3 characters!" });
  }

  next();
}
