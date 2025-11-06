import User from "../models/users.model.js";
import { MESSAGES } from "../utils/message.js";
import { STATUS_CODES } from "../utils/statusCode.js";
import { sendResponse } from "../utils/responseHandler.js";

export const getProfile = async (req, res) => {
  // verify requester is Admin or normal user

  if (req.params.username !== req.user.username) {
    return sendResponse(res, false, STATUS_CODES.FORBIDDEN, MESSAGES.SYSTEM.FORBIDDEN);
  } else {
    try {
      if (req.user.isAdmin) {
        // get admin  profile
        const profileInfo = await User.findOne(
          { username: req.user.username },
          { username: 1, email: 1, _id: 0 } // which fields u want
        );
        if (!profileInfo) {
          return sendResponse(res, false, STATUS_CODES.NOT_FOUND, MESSAGES.AUTH.USER_NOT_FOUND);
        }
        sendResponse(res, true, STATUS_CODES.OK, MESSAGES.COMMON.SUCCESS, profileInfo);
      } else {
        // get user  profile
        const profileInfo = await User.findOne(
          { username: req.user.username },
          { username: 1, email: 1, _id: 0 } // which fields u want
        );
        if (!profileInfo) {
          return sendResponse(res, false, STATUS_CODES.NOT_FOUND, MESSAGES.AUTH.USER_NOT_FOUND);
        }
        sendResponse(res, true, STATUS_CODES.OK, MESSAGES.COMMON.SUCCESS, profileInfo);
      }
    } catch (err) {
      console.log(err);
      return sendResponse(
        res,
        false,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        MESSAGES.SYSTEM.SERVER_ERROR
      );
    }
  }
};
