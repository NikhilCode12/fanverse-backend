import express from "express";
import {
  createPlayer,
  getPlayerById,
  getAllPlayers,
  updatePlayerById,
  deletePlayerById,
} from "../controllers/playerController.js";

const router = express.Router();

router.post("/create", createPlayer);
router.get("/all", getAllPlayers);
router.get("/:id", getPlayerById);
router.put("/:id", updatePlayerById);
router.delete("/:id", deletePlayerById);

export default router;
