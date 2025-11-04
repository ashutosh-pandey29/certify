# 🎓 Certify – Certificate Management System  

A full-featured **certificate generation and verification system** built with the **MERN stack** (MongoDB, Express, React, Node.js).  
It allows **admins** to manage student data, generate certificates, and **students** to verify or download them easily.  

---

## 🚀 Features

### 🧑‍💼 Admin Side
- Role-based **Login / Register**
- Upload Excel file (student data)
- Validate and save records in MongoDB
- Generate certificates for specific course/batch
- Automatically **email students** their certificates
- Manage issued certificates & logs

### 🎓 Student Side
- Student **register / login**
- Search certificate by ID or email
- View certificate details
- Download certificate as **PDF**
- Verify authenticity using unique certificate ID  

---

## 🧩 Tech Stack
**Frontend:** React.js, Bootstrap, Axios  
**Backend:** Node.js, Express.js, MongoDB (Mongoose)  
**Auth:** JWT, bcrypt  
**Deployment:** Render (Backend) + Vercel (Frontend)  

---

## 🧾 Workflow Summary

### 🧑‍💼 Admin Flow:
1. Login or register (role-based)
2. Upload Excel file with student data  
3. Validate and save data to MongoDB  
4. Generate certificates for specific course/batch  
5. Automatically email students once issued  

### 🎓 Student Flow:
1. Register or login  
2. Search for certificate by ID or email  
3. View certificate details  
4. Download as PDF  
5. Verify authenticity using certificate ID  

---

## 📦 Deployment (Render + Vercel)

### 🔹 Backend — Render
1. Connect GitHub repo on Render  
2. Set **Build Command** → `npm install`  
3. Set **Start Command** → `node server.js`  
4. Add required **Environment Variables**  
5. Click **Deploy** ✅  

### 🔹 Frontend — Vercel
1. Connect your React repo on Vercel  
2. Add environment variable →  
   `REACT_APP_API_URL=https://certify-backend.onrender.com`  
3. Deploy and test 🌐  

---



## 🚧 Future Enhancements
- 🔍 QR Code verification on certificate  
- 📊 Admin analytics dashboard  
- 📢 Bulk email notifications  
- 🌙 Dark mode support  
- 🌐 Multi-language support  

---

## 👨‍💻 Developer

**Ashutosh Pandey**  
📍 Full Stack Developer  

💼 *Skills:* HTML • CSS • JavaScript • Node.js • MongoDB • React  

🔗 [GitHub](https://github.com/) | [LinkedIn](https://linkedin.com/)  



---

## 🌟 Support
If you like this project, give it a ⭐ on GitHub!  
Help others discover **Certify** and support open-source.  

