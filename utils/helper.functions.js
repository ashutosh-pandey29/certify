import { nanoid } from "nanoid";

export const generateStudentId = () => {
  const now = new Date();
  const year = String(now.getFullYear()).slice(-2); // last 2 digits
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 01-12
  const randomNum = Math.floor(100000 + Math.random() * 900000); // 6-digit random
  return `STD-${year}${month}-${randomNum}`;
};

export const generateCertificateId = () => {
  return `CERT-${nanoid(6)}`;
};
