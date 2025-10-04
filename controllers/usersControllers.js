import * as userService from "../services/usersServices.js";
import { generateToken } from "../auth/jwt.js";
import { v4 as uuidv4 } from "uuid";
import { getPageParams, PAGE_SIZE } from "../helpers/paginations.js";
import { throwNotFound } from "../middlewares/errorHandler.js";

export function loginUser(req, res, next) {
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: "Name is required!" });

  const fakeUser = { id: uuidv4(), name };
  const token = generateToken(fakeUser);
  res.json({ token });
}

export async function listUsers(req, res, next) {
  try {
    const { page, limit, offset } = getPageParams(req);

    const [data, total] = await Promise.all([
      userService.getUsers({ limit, offset }),
      userService.countUsers(),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    return res.json({
      total,
      page,
      limit,
      totalPages,
      data,
    });
  } catch (err) {
    next(err);
  }
}

export async function getUser(req, res, next) {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    if (!user) throwNotFound("User");

    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function createUser(req, res, next) {
  try {
    const { name, email } = req.body;
    const newUser = await userService.createUser({ name, email });
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const updateUser = await userService.updateUser(id, { name, email });
    if (!updateUser) throwNotFound("User");

    res.json(updateUser);
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await userService.deleteUser(id);

    if (!deleted) return res.status(404).json({ error: "User not found" });
    if (!deleted) throwNotFound("USer");

    res.json({ message: "User deleted successfully!" });
  } catch (err) {
    next(err);
  }
}

export async function searchUsers(req, res, next) {
  try {
    const { name, status, role, sort, order } = req.query;
    const { page, limit, offset } = getPageParams(req);

    const result = await userService.searchUsers({
      name,
      status,
      role,
      sort,
      order,
      page,
      limit,
      offset,
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
}
