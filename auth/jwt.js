import jwt from "jsonwebtoken";

const SECRET = "@APIsecret1"; // in production we will use .ENV variable

export function generateToken(user) {
  return jwt.sign({ id: user.id, name: user.name }, SECRET, {
    expiresIn: "1h",
  });
}

export function authenticateToken(req, res, next) {
  const authHeader = req.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access denied!" });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid Token" });
    req.user = user;
    next();
  });
}
