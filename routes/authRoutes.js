import express from "express";
import {
  registerWithEmail,
  registerWithMobile,
  registerWithGoogle,
  registerWithFacebook,
} from "../controllers/userAuthController";

const router = express.Router();

router.post("/register/email", registerWithEmail);
router.post("/register/mobile", registerWithMobile);
router.post("/register/google", registerWithGoogle);
router.post("/register/facebook", registerWithFacebook);

export default router;
