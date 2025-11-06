// routes/certificate.routes.js
import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { checkRole } from "../middlewares/checkRole.middleware.js";
import {
  downloadCertificate,
  verifyCertificate,
  requestNewCertificate,
  uploadCertificate,
  generateBulk,
  generateSingle,
} from "../controllers/certificate.controller.js";

const router = express.Router();
router.get("/download/:certificateId", isAuthenticated, checkRole(["user"]), downloadCertificate);
router.post("/request", isAuthenticated, checkRole(["user"]), requestNewCertificate);


router.post("/upload", isAuthenticated, checkRole(["admin"]), uploadCertificate);
router.post("/generate/bulk", isAuthenticated, checkRole(["admin"]), generateBulk);
router.post("/generate/single", isAuthenticated, checkRole(["admin"]), generateSingle);


//? anyone verify certificate public route 
router.get("/verify/:certificateId" , verifyCertificate);






export default router;
