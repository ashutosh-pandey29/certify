import jwt from "jsonwebtoken";
import { STATUS_CODES } from "../utils/statusCode.js";
import { MESSAGES } from "../utils/message.js";
import { sendResponse } from "../utils/responseHandler.js";

export const isAuthenticated = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];

    
    if (typeof bearerHeader !== "undefined") {
      // const bearer = bearerHeader.split(" ");
      // const token = bearer[1];
      const token = bearerHeader.split(" ")[1];
      // verify jwt
      const decodedData = jwt.verify(token, process.env.JWT_SECRET); //decode userinfo
      req.user = decodedData; //id , username , isAdmin
      next();
    } else {
      return sendResponse(res, false, STATUS_CODES.UNAUTHORIZED, MESSAGES.AUTH.UNAUTHORIZED);
    }
  } catch (err) {
    console.log("is authenticated middleware error", err);
    return sendResponse(res, false, STATUS_CODES.FORBIDDEN, MESSAGES.AUTH.TOKEN_EXPIRED);
  }
};
