import express from "express";
import {
  createUser,
  getUserById,
  getUserByToken,
  getAllUsers,
  updateUserById,
  deleteUserById,
  findUserAndRegister,
  joinContest
} from "../controllers/userController.js";

const router = express.Router();

router.post("/joincontest", joinContest);
router.post('/findAndCreate',findUserAndRegister);
router.post("/create", createUser);
router.get("/", getUserByToken);
router.get("/all", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

export default router;
