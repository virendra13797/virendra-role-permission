import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import { loginValidator, registerValidator } from "../helpers/validoters.js";
import { getProfile } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", registerValidator, registerUser);
router.post("/login", loginValidator, loginUser);
router.get("/profile", verifyToken, loginValidator, getProfile);
export default router;
