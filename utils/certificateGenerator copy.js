import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";
import Certificate from "../models/certificate.model.js";
import Student from "../models/students.model.js";
import { generateCertificateId } from "../utils/helper.functions.js";

const certificateGenerator = async (students) => {
  try {
    let certificates = [];

    for (let student of students) {
      if (student.isCertificateIssued) {
        // console.log(`Skipping ${student.name}, certificate already issued.`);
        continue; // skip this student
      }

      const certId = generateCertificateId(); // generate certificate id for every certificate/student
      const certificate_file_path = `/uploads/certificates/${certId}.pdf`;

      const filePath = path.join(
        process.cwd(),
        "public",
        "uploads",
        "certificates",
        `${certId}.pdf`
      );
      const doc = new PDFDocument({ size: "A4", layout: "landscape" });
      doc.pipe(fs.createWriteStream(filePath));

      const templatePath = path.join(
        process.cwd(),
        "public",
        "uploads",
        "templates",
        "certificate_template.png"
      );

      doc.image(templatePath, 0, 0, { width: 842, height: 595 });

      // Student info
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

      // Signatures
      doc.font("Times-Italic").fontSize(14).fillColor("black").text(`B.R. Mishra`, 200, 460);
      doc.font("Times-Italic").fontSize(14).fillColor("black").text(`Vaishali Thakur`, 500, 460);

      doc.end();

      // const certificate = await Certificate.create({
      //   student_id: student.student_id,
      //   certificate_id: certId,
      //   certificate_file_path: `/uploads/certificates/${certId}.pdf`,
      // });

      await Student.updateOne(
        { student_id: student.student_id },
        {
          $set: {
            isCertificateIssued: true,
            certificate_id: certId,
            certificate_file_path: certFileURL,
          },
        }
      );

      // certificates.push(certificate);


    }

    // return certificates;
    
  } catch (err) {
    console.log(err);
  }
};

export default certificateGenerator;
