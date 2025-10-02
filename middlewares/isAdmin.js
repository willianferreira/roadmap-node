export function isAdmin(req, res, next) {
  if (!req.user) {
    return res
      .status(401)
      .json({ error: "Unauthorized: no user in request! " });
  }

  if (!req.user.role || req.user.role.toLowerCase() !== "admin") {
    return res.status(403).json({ error: "Forbidden: admin access required!" });
  }

  next();
}
