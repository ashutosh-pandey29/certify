import express from "express";
import multer from "multer";

import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { checkRole } from "../middlewares/checkRole.middleware.js";
import { studentValidationSchema } from "../validations/excelFileData.validation.js";
import { validate } from "../middlewares/validator.middleware.js";

import {
  getAllStudent,
  addStudent,
  updateStudent,
  deleteStudent,
  uploadStudent,
  studentProfile,
} from "../controllers/student.controller.js";

const router = express.Router();

// ----------------------
// Multer configuration
// ----------------------
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ----------------------
// Routes
// ----------------------

// View all students (admin only)
router.get("/all",  getAllStudent);

// Add a single student (admin only)
router.post("/add",  validate(studentValidationSchema), addStudent);

// Update a student (admin only)
router.put("/update/:student_id",  validate(studentValidationSchema), updateStudent);


// Delete a student (admin only)
router.delete("/delete/:student_id",  deleteStudent);

// Bulk upload students via Excel (admin only)
router.post("/upload",  upload.single("excelFile"), uploadStudent);

// View student profile (admin or student)
router.get("/:student_id", checkRole(["admin", "user"]), studentProfile);

export default router;
