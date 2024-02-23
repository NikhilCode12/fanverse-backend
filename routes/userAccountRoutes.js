import express from "express";
import {
  createUser,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
} from "../controllers/userController";

const router = express.Router();

router.post("/create", createUser);
router.get("/all", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

export default router;
