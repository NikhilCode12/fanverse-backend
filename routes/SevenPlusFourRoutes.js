import express from "express";
import {createTeam, getAllTeams, deleteTeamById} from "../controllers/SevenPlusFourController.js";

const router = express.Router();
router.get('/allteams',getAllTeams);
router.post('/create',createTeam);
router.post('/removeteam',deleteTeamById);
export default router;