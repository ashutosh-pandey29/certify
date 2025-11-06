// utils/responseHandler.js
import { STATUS_CODES } from "./statusCode.js";

/**
 * Sends a consistent API response
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code
 * @param {Boolean} success - success flag
 * @param {String} message - descriptive message
 * @param {Object|null} data - optional data
 */

export const sendResponse = (
  res,
  success = true,
  statusCode = STATUS_CODES.OK,
  message = "",
  data = null
) => {
  return res.status(statusCode).json({ success, statusCode, message, data });
};
