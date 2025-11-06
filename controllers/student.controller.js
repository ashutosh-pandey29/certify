import { STATUS_CODES } from "../utils/statusCode.js";
import { MESSAGES } from "../utils/message.js";
import { generateStudentId ,  generateCertificateId } from "../utils/helper.functions.js";
import Student from "../models/students.model.js";


//!<----------------- get student 
export const getAllStudent = (req, res) => {
  res.json({
    message: "get stu controller"
  })
};


export const addStudent = (req, res) => {
  res.json({
    message: "add stu controller",
    data:req.body,
  })
}


export const updateStudent = (req, res) => {
  res.json({
    message: "update stu controller"
  })
}

export const deleteStudent = (req, res) => {
  res.json({
    message: "delete stu controller"
  })
}

export const addStudentMany = (req, res) => {
  res.json({
    message: "add many stu controller"
  })
}


export const studentProfile = (req, res) => {
  res.json({
    message: "profile stu controller"
  })
}












