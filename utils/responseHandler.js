// utils/responseHandler.js
import { STATUS_CODES } from "./statusCodes.js";

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
  statusCode = STATUS_CODES.OK,
  success = true,
  message = "",
  data = null
) => {
  return res.status(statusCode).json({ success, statusCode, message, data });
};
