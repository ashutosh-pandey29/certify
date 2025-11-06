import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { checkRole } from "../middlewares/checkRole.middleware.js";
import { getAllStudent , addStudent ,  updateStudent ,  deleteStudent ,  addStudentMany ,  studentProfile } from "../controllers/student.controller.js";

const router = express.Router();

// View all students
router.get("/all", isAuthenticated, checkRole(["admin"]), getAllStudent);

// Add a single student
router.post("/add", isAuthenticated, checkRole(["admin"]), addStudent);

// Update a student
router.put("/update/:id", isAuthenticated, checkRole(["admin"]), updateStudent);

// Delete a student
router.delete("/delete/:id", isAuthenticated, checkRole(["admin"]), deleteStudent);

// Add bulk students via Excel
router.post("/add/bulk", isAuthenticated, checkRole(["admin"]), addStudentMany);

//view student profile both admin and student can see 
router.get("/:studentId", isAuthenticated, checkRole(["admin", "user"]), studentProfile);


export default router;