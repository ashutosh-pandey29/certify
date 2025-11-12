import { nanoid } from "nanoid";

export const generateStudentId = () => {
  const now = new Date();
  const year = String(now.getFullYear()).slice(-2); // last 2 digits
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 01-12
  const randomNum = Math.floor(100000 + Math.random() * 900000); // 6-digit random
  return `STD-${year}${month}-${randomNum}`;
};

export const generateCertificateId = () => {
  const now = new Date();
  const year = String(now.getFullYear()).slice(-2); // last 2 digits
  return `CERT-${nanoid(6)}-${year}`;
};

export const parseExcelDate = (value) => {
  if (!value) return null;

  // If numeric (Excel serial date)
  if (typeof value === "number") {
    const excelEpoch = new Date(1899, 11, 30);
    return new Date(excelEpoch.getTime() + value * 86400000);
  }

  const d = new Date(value);
  return d instanceof Date && !isNaN(d) ? d : null;
};


