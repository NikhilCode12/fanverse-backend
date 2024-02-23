import express from "express";
import {
  createContest,
  getContestById,
  getAllContests,
  updateContestById,
  deleteContestById,
} from "../controllers/contestController.js";

const router = express.Router();

router.post("/create", createContest);
router.get("/all", getAllContests);
router.get("/:id", getContestById);
router.put("/:id", updateContestById);
router.delete("/:id", deleteContestById);

export default router;
