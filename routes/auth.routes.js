import express from "express";
import { validate } from "../middlewares/validator.middleware.js";
import { authRegisterSchema, authLoginSchema } from "../validations/auth.validation.js";

import {registerUser,loginUser,forgetPassword,changePassword,isLoggedIn,} from "../controllers/auth.controller.js";

const router = express.Router();

// Auth Routes
router.post("/register", validate(authRegisterSchema) ,   registerUser);
router.post("/login", validate(authLoginSchema),  loginUser);
router.post("/forget-password", forgetPassword);
router.post("/change-password", changePassword);
router.get("/isLoggedIn", isLoggedIn);

export default router;
