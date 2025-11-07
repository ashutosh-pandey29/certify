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
  addStudentViaExcel,
  studentProfile,
} from "../controllers/student.controller.js";

const router = express.Router();

// multer configuration for excel file  reading

const storage = multer.memoryStorage();
const upload = multer({ storage });

// View all students  ,
router.get("/all", isAuthenticated, checkRole(["admin"]), getAllStudent);

// Add a single student
router.post(
  "/add",
  isAuthenticated,
  checkRole(["admin"]),
  validate(studentValidationSchema),
  addStudent
);

// Update a student isAuthenticated, checkRole(["admin"])
router.put(
  "/update/:student_id",
  isAuthenticated,
  checkRole(["admin"]),
  validate(studentValidationSchema),
  updateStudent
);

// Delete a student
router.delete("/delete/:student_id", isAuthenticated, checkRole(["admin"]), deleteStudent);

// Add bulk students via Excel
router.post(
  "/read-excel",
  isAuthenticated,
  checkRole(["admin"]),
  upload.single("excelFile"),
  addStudentViaExcel
);

//view student profile both admin and student can see
router.get("/:student_id", isAuthenticated, checkRole(["admin", "user"]), studentProfile);

export default router;
