import { configDotenv } from "dotenv";
import { STATUS_CODES } from "../utils/statusCode.js";
import { MESSAGES } from "../utils/message.js";

// Load environment variables
configDotenv();


export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  const statusCode = err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
  const message = err.message || MESSAGES.SYSTEM.SERVER_ERROR;

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    // useful for debugging (hide in production)
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
