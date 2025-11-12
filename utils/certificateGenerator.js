import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";
import Student from "../models/students.model.js";
import { generateCertificateId } from "../utils/helper.functions.js";

const certificateGenerator = async (student) => {
  try {
    if (student.isCertificateIssued) return false;

    const certId = generateCertificateId();
    const certificate_file_path = `/uploads/certificates/${certId}.pdf`;

    const filePath = path.join(
      process.cwd(),
      "public",
      "uploads",
      "certificates",
      `${certId}.pdf`
    );
        const stream = fs.createWriteStream(filePath);

    const doc = new PDFDocument({ size: "A4", layout: "landscape" });
    doc.pipe(stream);

    const templatePath = path.join(
      process.cwd(),
      "public",
      "uploads",
      "templates",
      "certificate_template.png"
    );

    doc.image(templatePath, 0, 0, { width: 842, height: 595 });

    doc
      .font("Helvetica")
      .fontSize(14)
      .fillColor("black")
      .text(`Student ID: ${student.student_id}`, 140, 30);
    doc
      .font("Helvetica")
      .fontSize(14)
      .fillColor("black")
      .text(`Certificate ID: ${certId}`, 842 - 320, 30);
    doc
      .font("Times-Italic")
      .fontSize(30)
      .fillColor("dimgray")
      .text(`Mr / Miss ${student.name}`, 0, 315, { align: "center", width: 842 });

    doc.font("Times-Italic").fontSize(14).fillColor("black").text(`B.R. Mishra`, 200, 460);
    doc.font("Times-Italic").fontSize(14).fillColor("black").text(`Vaishali Thakur`, 500, 460);

    doc.end();

    // Wait for file writing to finish
    await new Promise((resolve, reject) => {
      stream.on("finish", resolve);
      stream.on("error", reject);
    });

    // Update student record
    await Student.findOneAndUpdate(
      { student_id: student.student_id },
      {
        $set: {
          isCertificateIssued: true,
          certificate_id: certId,
          certificate_file_path:certificate_file_path,
        },
      }
    );
    console.log(`Certificate generated for ${student.name}`);
    return true;
  } catch (err) {
    console.error("Error generating certificate:", err);
    return false;
  }
};

export default certificateGenerator;