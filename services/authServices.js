import { pool } from "../config/db.js";
import bcrypt from "bcrypt";

export async function registerUser({ email, password, role = "user" }) {
  const saltRounds = 10;
  const password_hash = await bcrypt.hash(password, saltRounds);

  const result = await pool.query(
    "INSERT INTO users_auth (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role, created_at",
    [email, password_hash, role]
  );

  return result.rows[0];
}

export async function loginUser({ email, password }) {
  const result = await pool.query("SELECT * FROM users_auth WHERE email = $1", [
    email,
  ]);

  const user = result.rows[0];
  if (!user) return null;

  const validPassword = await bcrypt.compare(password, user.password_hash);
  if (!validPassword) return null;

  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
}
