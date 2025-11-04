import express from "express";
import cors from "cors";

// making app

const app = express();


app.get("/", (req, res) => {
  res.send(`
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Certify Portal - Coming Soon</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #007bff, #6610f2);
      color: white;
      text-align: center;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    h1 {
      font-size: 2.5rem;
    }
    p {
      font-size: 1.2rem;
      opacity: 0.9;
    }
  </style>
</head>
<body>
  <h1>🚀 Certify Portal</h1>
  <p>Coming Soon...</p>
</body>
</html>

  `)
});







export default app;