import express from "express";
import {
  createMatch,
  getMatchById,
  getAllMatches,
  updateMatchById,
  deleteMatchById,
} from "../controllers/matchController.js";

const router = express.Router();

router.post("/create", createMatch);
router.get("/all", getAllMatches);
router.get("/:id", getMatchById);
router.put("/:matchId", updateMatchById);
router.delete("/:id", deleteMatchById);

export default router;
