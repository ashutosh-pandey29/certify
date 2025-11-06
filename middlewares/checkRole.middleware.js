import { STATUS_CODES } from "../utils/statusCode.js";
import { MESSAGES } from "../utils/message.js";
import { sendResponse } from "../utils/responseHandler.js";

export const checkRole = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      const role = req.user.isAdmin ? "admin" : "user";

    if (!allowedRoles.includes(role)) {
      return sendResponse(res, false,  STATUS_CODES.FORBIDDEN, MESSAGES.SYSTEM.FORBIDDEN);
    }

    next();
    } catch (err) {
      return sendResponse(res , false ,  STATUS_CODES.INTERNAL_SERVER_ERROR ,  MESSAGES.SYSTEM.SERVER_ERROR )
   }
  };
};
