import path from "path";
import XLSX from "xlsx";
import { STATUS_CODES } from "../utils/statusCode.js";
import { MESSAGES } from "../utils/message.js";
import { generateStudentId, generateCertificateId } from "../utils/helper.functions.js";
import Student from "../models/students.model.js";
import { sendResponse } from "../utils/responseHandler.js";
import { isExist } from "../utils/isExists.js";

//!<----------------- get student
export const getAllStudent = async (req, res) => {
  try {
    const students = await Student.find()
      .select({
        student_id: 1,
        name: 1,
        email: 1,
        course: 1,
        isCertificateIssued: 1,
        _id: 0,
      })
      .sort({ createdAt: -1 });

    if (students.length === 0) {
      return sendResponse(res, false, STATUS_CODES.NOT_FOUND, MESSAGES.STUDENT.NOT_FOUND);
    }
    return sendResponse(res, true, STATUS_CODES.OK, MESSAGES.STUDENT.FOUND, students);
  } catch (err) {
    return sendResponse(
      res,
      false,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      MESSAGES.SYSTEM.SERVER_ERROR
    );
  }
};

export const addStudent = async (req, res) => {
  try {
    const { name, email, course, isCertificateIssued } = req.body;
    let student_id = generateStudentId();

    const exist = await Student.findOne({ email: email });
    if (exist)
      return sendResponse(res, false, STATUS_CODES.CONFLICT, MESSAGES.STUDENT.DUPLICATE_ENTRY);

    const newStudent = new Student({
      student_id,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      course: course.trim(),
      isCertificateIssued: isCertificateIssued || false,
    });

    const isInserted = await newStudent.save();

    if (!isInserted) {
      return sendResponse(res, false, STATUS_CODES.BAD_REQUEST, MESSAGES.STUDENT.NOT_CREATED);
    }

    return sendResponse(res, true, STATUS_CODES.OK, MESSAGES.STUDENT.CREATED);
  } catch (err) {
    return sendResponse(
      res,
      false,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      MESSAGES.STUDENT.SERVER_ERROR,
      err
    );
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { student_id } = req.params;
    const { name, email, course, isCertificateIssued } = req.body;

    const exist = await Student.findOne({ student_id: student_id });
    if (!exist) return sendResponse(res, false, STATUS_CODES.NOT_FOUND, MESSAGES.STUDENT.NOT_FOUND);

    const isUpdated = await Student.findOneAndUpdate(
      { student_id },
      { $set: { name, email, course, isCertificateIssued } }
    );

    if (!isUpdated)
      return sendResponse(res, false, STATUS_CODES.BAD_REQUEST, MESSAGES.STUDENT.NOT_UPDATED);

    return sendResponse(res, true, STATUS_CODES.OK, MESSAGES.STUDENT.UPDATED);

  } catch (err) {
    return sendResponse(
      res,
      false,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      MESSAGES.STUDENT.SERVER_ERROR,
      err
    );
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { student_id } = req.params;

    // check student exist or not

    const exist = await Student.findOne({ student_id: student_id });
    if (!exist) return sendResponse(res, false, STATUS_CODES.NOT_FOUND, MESSAGES.STUDENT.NOT_FOUND);

    const isDeleted = await Student.findOneAndDelete({ student_id: student_id });

    if (!isDeleted) {
      return sendResponse(res, false, STATUS_CODES.BAD_REQUEST, MESSAGES.STUDENT.NOT_DELETED);
    }

    return sendResponse(res, true, STATUS_CODES.OK, MESSAGES.STUDENT.DELETED);
  } catch (err) {
    return sendResponse(
      res,
      false,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      MESSAGES.STUDENT.SERVER_ERROR,
      err
    );
  }
};

export const addStudentViaExcel = async (req, res) => {
  try {
    // check file uploaded or not

    if (!req.file) {
      return sendResponse(res, false, STATUS_CODES.BAD_REQUEST, MESSAGES.FILE.NOT_UPLOADED);
    }

    //read excel file data and not save file in server
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // now insert excel data to db
    const students = sheetData.map((row) => ({
      student_id: generateStudentId(),
      name: row.name?.trim(),
      email: row.email?.trim(),
      course: row.course?.trim(),
      isCertificateIssued: row.isCertificateIssued || false,
    }));

    //Extract all email
    const allEmails = students.map((student) => student.email);

    //existing students
    const existingStudents = await Student.find({ email: { $in: allEmails } });

    //Build a Set of existing emails
    const existingEmails = new Set(existingStudents.map((s) => s.email));

    // Filter only new  students
    const newStudents = students.filter((s) => !existingEmails.has(s.email));

    let insertedStudents = [];
    if (newStudents.length > 0) {
      insertedStudents = await Student.insertMany(newStudents);
    }

    const responseSummary = {
      totalRecordsInFile: students.length,
      totalInserted: insertedStudents.length,
      totalDuplicates: existingStudents.length,
      message: `${insertedStudents.length} new record(s) inserted successfully and ${existingStudents.length} duplicate record(s) skipped.`,
    };
    return sendResponse(
      res,
      true,
      STATUS_CODES.OK,
      MESSAGES.STUDENT.UPLOAD_SUCCESS,
      responseSummary
    );
  } catch (err) {
    return sendResponse(
      res,
      false,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      MESSAGES.SYSTEM.SERVER_ERROR,
      err
    );
  }
};

export const studentProfile = async (req, res) => {
  const { student_id } = req.params;
   try {
     const student = await Student.findOne({student_id})
      .select({
        student_id: 1,
        name: 1,
        email: 1,
        course: 1,
        isCertificateIssued: 1,
        _id: 0,
      })
    

    if (student.length === 0) {
      return sendResponse(res, false, STATUS_CODES.NOT_FOUND, MESSAGES.STUDENT.NOT_FOUND);
    }
    return sendResponse(res, true, STATUS_CODES.OK, MESSAGES.STUDENT.FOUND, student);
  } catch (err) {
    return sendResponse(
      res,
      false,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      MESSAGES.SYSTEM.SERVER_ERROR
    );
  }
};
