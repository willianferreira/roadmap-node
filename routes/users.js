import express from "express";
import {
  loginUser,
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  searchUsers,
} from "../controllers/usersControllers.js";
import { validateUser } from "../middlewares/validateUser.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { authenticateToken } from "../auth/jwt.js";

const router = express.Router();

router.get("/login", loginUser);
router.get("/", authenticateToken, listUsers);
router.get("/search", authenticateToken, searchUsers);
router.get("/:id", authenticateToken, getUser);
router.post("/", authenticateToken, validateUser, createUser);
router.put("/:id", authenticateToken, validateUser, updateUser);
router.delete("/:id", authenticateToken, isAdmin, deleteUser);

export default router;
