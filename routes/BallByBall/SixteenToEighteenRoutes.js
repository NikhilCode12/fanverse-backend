import express from "express";
import {
  createContest,
  getContestById,
  getAllContests,
  updateContestById,
  deleteContestById,
    getSpotsLeft,
  decreaseSpots
} from "../../controllers/BallbyBall/SixteenToEighteenController.js";

const router = express.Router();

router.post("/create", createContest);
router.get("/all", getAllContests);
router.get("/:id", getContestById);
router.put("/:id", updateContestById);
router.delete("/:id", deleteContestById);
router.get("/spotsleft/:id",getSpotsLeft);
router.post("/decresespots/:id",decreaseSpots);
export default router;
