import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { checkRole } from "../middlewares/checkRole.middleware.js";
import {downloadCertificate,verifyCertificate} from "../controllers/certificate.controller.js";

const router = express.Router();
  
//? download certificate via student id or certificate id
router.get("/download/:id" , isAuthenticated, checkRole(["admin", "user"]), downloadCertificate); 

//? anyone verify certificate(student id or certificate id) public route ,
router.get("/verify/:id" , verifyCertificate);

export default router;
