import Joi from "joi";
import { VALIDATION_MESSAGES } from "./messages.validation.js";



/***
 * =================================
 * ! REGISTER VALIDATION ERROR SCHEMA
 * ==================================
 */


export const authRegisterSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.empty": VALIDATION_MESSAGES.NAME_REQUIRED,
    "string.min": VALIDATION_MESSAGES.NAME_MIN,
    "string.max": VALIDATION_MESSAGES.NAME_MAX,
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": VALIDATION_MESSAGES.EMAIL_REQUIRED,
      "string.email": VALIDATION_MESSAGES.EMAIL_INVALID,
    }),

  password: Joi.string()
    .min(6)
    .max(20)
    .required()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{6,20}$"))
    .messages({
      "string.empty": VALIDATION_MESSAGES.PASSWORD_REQUIRED,
      "string.min": VALIDATION_MESSAGES.PASSWORD_MIN,
      "string.max": VALIDATION_MESSAGES.PASSWORD_MAX,
      "string.pattern.base": VALIDATION_MESSAGES.PASSWORD_PATTERN,
    }),

  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": VALIDATION_MESSAGES.CONFIRM_PASSWORD_MATCH,
    "any.required": VALIDATION_MESSAGES.CONFIRM_PASSWORD_REQUIRED,
  }),

  isAdmin: Joi.boolean().default(false).messages({
    "boolean.base": "Invalid flag, must be true or false",
  }),
});

/***
 * =================================
 * ! LOGIN VALIDATION ERROR SCHEMA
 * ==================================
 */

export const authLoginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email({ minDomainSegments: 2 })
    .required()
    .messages({
      "string.empty": VALIDATION_MESSAGES.EMAIL_REQUIRED,
      "string.email": VALIDATION_MESSAGES.EMAIL_INVALID,
      "any.required": VALIDATION_MESSAGES.EMAIL_REQUIRED,
    }),

  password: Joi.string()
    .min(6)
    .max(20)
    .required()
    .messages({
      "string.empty": VALIDATION_MESSAGES.PASSWORD_REQUIRED,
      "string.min": VALIDATION_MESSAGES.PASSWORD_MIN,
      "string.max": VALIDATION_MESSAGES.PASSWORD_MAX,
      "any.required": VALIDATION_MESSAGES.PASSWORD_REQUIRED,
    }),
});
