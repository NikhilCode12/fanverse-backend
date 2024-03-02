import express from "express";
import {
  createUser,
  getUserById,
  getUserByToken,
  getAllUsers,
  updateUserById,
  deleteUserById,
  findUserByEmailAndRegister
} from "../controllers/userController.js";

const router = express.Router();

router.post('/findAndCreate',findUserByEmailAndRegister);
router.post("/create", createUser);
router.get("/", getUserByToken);
router.get("/all", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

export default router;
