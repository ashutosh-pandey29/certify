import express from "express";
import {
  registerUser,
  loginUser,
  forgetPassword,
  changePassword,
  isLoggedIn,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forget-password", forgetPassword);
router.post("/change-password", changePassword);
router.get("/isLoggedIn", isLoggedIn);

export default router;
