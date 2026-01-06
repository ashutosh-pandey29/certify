/**
 * ================================
 * ! DEFINING COMMON ROUTES THAT ACCESSED BY BOTH ROLE USER AND ADMIN 
 * ======================================
 */

import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { getProfile } from "../controllers/profile.controller.js";

//? creating express router instance

const router = express.Router();

router.get("/:username",isAuthenticated,checkRole(["admin", "user"]), getProfile);

export default router;