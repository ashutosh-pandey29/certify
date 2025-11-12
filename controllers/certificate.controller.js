import { STATUS_CODES } from "../utils/statusCode.js";
import { MESSAGES } from "../utils/message.js";
import { sendResponse } from "../utils/responseHandler.js";
import Student from "../models/students.model.js";
import path from "path";
import fs from "fs";

export const downloadCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return sendResponse(res, false, STATUS_CODES.BAD_REQUEST, MESSAGES.CERTIFICATE.INVALID);
    }
    const student = await Student.findOne({ $or: [{ certificate_id: id }, { student_id: id }] });

    if (!student) {
      return sendResponse(res, false, STATUS_CODES.BAD_REQUEST, MESSAGES.CERTIFICATE.NOT_FOUND);
    }

    const filePath = path.join(process.cwd(), "public", student.certificate_file_path);

    if (!fs.existsSync(filePath)) {
      return sendResponse(res, false, STATUS_CODES.BAD_REQUEST, MESSAGES.CERTIFICATE.NOT_FOUND);
    }

    const certificate_id = student.certificate_id;
    return res.download(filePath, `${certificate_id}.pdf`, (err) => {
      if (err) {
        // console.error("Download error:", err);
        return sendResponse(res, false, STATUS_CODES.BAD_REQUEST, "Error downloading file");
      }
    });
  } catch (err) {
    return sendResponse(
      res,
      false,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      MESSAGES.SYSTEM.SERVER_ERROR
    );
  }
};

export const verifyCertificate = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendResponse(res, false, STATUS_CODES.BAD_REQUEST, MESSAGES.CERTIFICATE.INVALID);
    }

    const student = await Student.findOne({ $or: [{ certificate_id: id }, { student_id: id }] });

    if (!student) {
      return sendResponse(res, false, STATUS_CODES.BAD_REQUEST, MESSAGES.CERTIFICATE.NOT_FOUND);
    }

    if (!student.isCertificateIssued || !student.certificate_file_path) {
      return sendResponse(res, false, STATUS_CODES.BAD_REQUEST, "Certificate not generated yet");
    }

    const data = {
      id: student.student_id,
      name: student.name,
      certificate_id: student.certificate_id,
      internship_domain: student.internship_domain,
      startDate: student.start_date,
      endDate: student.end_date,
      issuedAt: student.createdAt,
    };
    return sendResponse(res, true, STATUS_CODES.OK, "Certificate issued.", data);
  } catch (err) {
    return sendResponse(
      res,
      false,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      MESSAGES.SYSTEM.SERVER_ERROR
    );
  }
};
