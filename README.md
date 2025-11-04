# 🧾 Certificate Verification System (MERN)

A complete full-stack web app to **generate, manage, and verify digital certificates**.  
Built with **MongoDB, Express, React, Node.js**, following MVC architecture and JWT-based authentication.

---

## 🚀 Overview

This project simplifies the process of certificate generation and verification for educational institutes or organizations.  
Admins can create certificates, students can verify them, and each certificate is stored securely with a unique ID or QR code.

---

## 🧩 Key Features

### 🎓 Certificate Management
- Add / Update / Delete certificates  
- Each certificate has a **unique verification ID**  
- PDF certificate generation (via PDFKit)  
- Excel import/export support using **Multer + XLSX**

### 🔐 Authentication & Roles
- Secure JWT authentication  
- Role-based access: **Admin** and **Student**  
- Password encryption and reset flow  

### 📧 Email Integration
- Email certificate or password reset link via **Nodemailer**

### 🌐 Deployment Ready
- **Backend hosted on Render**  
- **Frontend hosted on Vercel**  
- **MongoDB Atlas** as a cloud database  

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React.js, Bootstrap, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Auth | JWT |
| File Upload | Multer |
| PDF / Excel | PDFKit, XLSX |
| Deployment | Render (Server), Vercel (Client) |

---
