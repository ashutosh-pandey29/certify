import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/users.model.js";
import { isExist } from "../utils/isExists.js";
import { MESSAGES } from "../utils/message.js";
import { STATUS_CODES } from "../utils/statusCode.js";
import { sendResponse } from "../utils/responseHandler.js";

//config env
dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;

    // check user exist or not
    const exist = await isExist({ $or: [{ email }, { username }] });
    if (exist)
      return sendResponse(res, false, STATUS_CODES.CONFLICT, MESSAGES.AUTH.USER_ALREADY_EXISTS);

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // check user role

    // creating new user
    const newUser = new User({ username, email, password: hashedPassword, isAdmin });
    const savedUser = await newUser.save();

    if (savedUser) {
      return sendResponse(res, true, STATUS_CODES.CREATED, MESSAGES.AUTH.REGISTER_SUCCESS);
    } else {
      return sendResponse(
        res,
        false,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        MESSAGES.AUTH.USER_NOT_CREATED
      );
    }
  } catch (err) {
    console.error("Registration Error:", err);
    return sendResponse(
      res,
      false,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      MESSAGES.SYSTEM.SERVER_ERROR
    );
  }
};

export const loginUser = async (req, res) => {
  try {
    const { login_id, password } = req.body;

    // find user by email OR username
    const isUser = await User.findOne({
      $or: [{ email: login_id }, { username: login_id }],
    });

    console.log("Fetched User =>", isUser);


    if (!isUser)
      return sendResponse(res, false, STATUS_CODES.NOT_FOUND, MESSAGES.AUTH.USER_NOT_FOUND);

    // compare password
    const isMatch = await bcrypt.compare(password, isUser.password);
    if (!isMatch) {
      return sendResponse(res, false, STATUS_CODES.BAD_REQUEST, MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    // generating JWT token
    const user = isUser;
    const jwtPayload = {
      id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    };

    // signing token , expire in 1 hr
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: "1h" });

    if (token) {
      return sendResponse(res, true, STATUS_CODES.OK, MESSAGES.AUTH.LOGIN_SUCCESS, {
        token: token,
        username: user.username,
        isAdmin:user.isAdmin
      });
    }
  } catch (err) {
    console.error("Login Error:", err);
    return sendResponse(
      res,
      false,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      MESSAGES.SYSTEM.SERVER_ERROR
    );
  }
};

export const forgetPassword = (req, res) => {
  res.send("Forget password route hit");
};

export const changePassword = (req, res) => {
  res.send("Change password route hit");
};

export const isLoggedIn = (req, res) => {
  res.send("User login check route hit");
};

export const alluser = async (req, res) => {
  let data = await User.find();

  res.json(data);
};
