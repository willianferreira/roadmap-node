import { pool } from "../config/db.js";
import { getPageParams } from "../helpers/paginations.js";

//get all users
export async function getUsers({ limit, offset }) {
  const { rows } = await pool.query(
    "SELECT id, name, email, created_at from users ORDER BY id LIMIT $1 OFFSET $2",
    [limit, offset]
  );
  return rows;
}

//count users
export async function countUsers() {
  const { rows } = await pool.query("SELECT COUNT(*) FROM users");
  return parseInt(rows[0].count, 10);
}

//get an user by ID
export async function getUserById(id) {
  try {
    const result = await pool.query(
      "SELECT id, name, email, created_at FROM users WHERE id = $1",
      [id]
    );
    return result.rows[0];
  } catch (err) {
    const dbError = new Error("Database error!");
    dbError.status = 500;
    throw dbError;
  }
}

//creating an user on database returning user data
export async function createUser({ name, email }) {
  const result = await pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email, created_at",
    [name, email]
  );
  return result.rows[0];
}

//update an user
export async function updateUser(id, { name, email }) {
  const result = await pool.query(
    "UPDATE users set name = $1, email = $2 WHERE id = $3 RETURNING id, name, email, created_at",
    [name, email, id]
  );
  return result.rows[0];
}

//removing an user on database
export async function deleteUser(id) {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING id",
    [id]
  );
  return result.rows[0];
}

//search an user
export async function search({
  name,
  status,
  role,
  sort = "id",
  order = "asc",
  page,
  limit,
  offset,
}) {
  const validSortFields = [
    "id",
    "name",
    "email",
    "status",
    "role",
    "created_at",
  ];
  const validOrder = ["asc", "desc"];

  const sortField = validSortFields.includes(sort) ? sort : "id";
  const sortOrder = validOrder.includes(order.toLowerCase())
    ? order.toUpperCase()
    : "ASC";

  let baseQuery = "FROM users";
  const values = [];
  const conditions = [];

  if (name) {
    values.push(`%${name}%`);
    conditions.push(`name ILIKE $${values.length}`);
  }

  if (status) {
    values.push(status);
    conditions.push(`LOWER(status) = LOWER($${values.length})`);
  }

  if (role) {
    values.push(role);
    conditions.push(`LOWER(role) = LOWER($${values.length})`);
  }

  if (conditions.length > 0) {
    baseQuery += " WHERE " + conditions.join(" AND ");
  }

  const query = `SELECT id, name, email, status, role, created_at ${baseQuery}
  ORDER BY ${sortField} ${sortOrder} 
  LIMIT ${limit} OFFSET ${offset}`;

  const countQuery = `SELECT COUNT(*) ${baseQuery}`;

  const { rows } = await pool.query(query, values);
  const countResult = await pool.query(countQuery, values);

  const total = parseInt(countResult.rows[0].count, 10);
  const totalPages = Math.max(1, Math.ceil(total / limit));

  console.log(query);

  return { total, page, limit, totalPages, data: rows };
}
