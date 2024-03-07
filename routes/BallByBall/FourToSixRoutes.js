import express from "express";
import {
  createContest,
  getContestById,
  getAllContests,
  updateContestById,
  deleteContestById,
  getSpotsLeft,
  decreaseSpots,
  getAllMatchContest
} from "../../controllers/BallbyBall/FourToSixController.js";

const router = express.Router();

router.get("/getall",getAllMatchContest);
router.post("/create", createContest);
router.get("/all", getAllContests);
router.get("/:id", getContestById);
router.put("/:id", updateContestById);
router.delete("/:id", deleteContestById);
router.get("/spotsleft/:id",getSpotsLeft);
router.post("/decresespots/:id",decreaseSpots);


export default router;
