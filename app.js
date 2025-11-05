import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { STATUS_CODES } from "./utils/statusCode.js";


// Initialize Express application instance
const app = express(); 




// middleware
app.use(cors());

app.use(express.json()); // handle application/json
app.use(express.urlencoded({ extended: true })); // handle form-data (x-www-form-urlencoded)





/**
 * *************************
 * ! importing all routes
 * *************************
 */
import authRoutes from "./routes/auth.routes.js";
// import studentRoutes from "./routes/student.routes.js";
// import adminRoutes from "./routes/admin.routes.js";


//! API routes
app.use("/auth", authRoutes);



// home route
app.get("/", (req, res) => {
  res.send(`
    <h1 style="
      text-align: center;
      height: 90vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      flex-direction: column;
    ">
      Certify Portal Coming Soon 🚀
    </h1>
  `);
});

// handle invalid routes after all route imports
app.use((req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  error.statusCode = STATUS_CODES.NOT_FOUND;
  next(error);
});



//! global error handler -> middleware 

app.use(errorHandler);

export default app;
