import express from "express";
import { validate } from "../middlewares/validator.middleware.js";
import { authRegisterSchema, authLoginSchema ,ChangePasswordSchema} from "../validations/auth.validation.js";
import {registerUser,loginUser,forgetPassword,changePassword,resetPassword} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Auth Routes
router.post("/register", validate(authRegisterSchema) ,   registerUser);
router.post("/login", validate(authLoginSchema),  loginUser);
router.post("/forget-password", forgetPassword);
router.post("reset-password" ,  resetPassword)
router.post("/change-password",validate(ChangePasswordSchema), isAuthenticated ,  changePassword);


export default router;
