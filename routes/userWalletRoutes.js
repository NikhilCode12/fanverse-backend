import express from "express";
import {
  createUserWallet,
  getUserWalletById,
  getAllUserWallets,
  updateUserWalletById,
  deleteUserWalletById,
} from "../controllers/userWalletController.js";

const router = express.Router();

router.post("/create", createUserWallet);
router.get("/all", getAllUserWallets);
router.get("/:id", getUserWalletById);
router.put("/:id", updateUserWalletById);
router.delete("/:id", deleteUserWalletById);

export default router;
