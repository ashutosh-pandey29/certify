import Joi from "joi";
import { VALIDATION_MESSAGES } from "./messages.validation.js";

/***
 * =================================
 * ! REGISTER VALIDATION ERROR SCHEMA
 * ==================================
 */

export const authRegisterSchema = Joi.object({
  // name: Joi.string().min(3).max(30).required().messages({
  //   "string.empty": VALIDATION_MESSAGES.NAME_REQUIRED,
  //   "string.min": VALIDATION_MESSAGES.NAME_MIN,
  //   "string.max": VALIDATION_MESSAGES.NAME_MAX,
  // }),

  username: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^(?=[a-zA-Z0-9.-]{3,30}$)(?!.*[.-]{2})(?![.-])[a-zA-Z0-9.-]+(?<![.-])$/) // alphanumeric with optional . or -
    .required()
    .messages({
      "string.empty": VALIDATION_MESSAGES.USERNAME_REQUIRED,
      "string.min": VALIDATION_MESSAGES.USERNAME_MIN,
      "string.max": VALIDATION_MESSAGES.USERNAME_MAX,
      "string.pattern.base": VALIDATION_MESSAGES.USERNAME_INVALID,
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

  // isAdmin: Joi.boolean().default(false).messages({
  //   "boolean.base": "Invalid flag, must be true or false",
  // }),
  isAdmin: Joi.boolean()
  .truthy("true")   // string "true" → true
  .falsy("false")   // string "false" → false
  .default(false)
  .messages({
    "boolean.base": "Invalid flag, must be true or false",
  }),

});

/***
 * =================================
 * ! LOGIN VALIDATION ERROR SCHEMA
 * ==================================
 */

export const authLoginSchema = Joi.object({
  // email: Joi.string()
  //   .trim()
  //   .email({ minDomainSegments: 2 })
  //   .required()
  //   .messages({
  //     "string.empty": VALIDATION_MESSAGES.EMAIL_REQUIRED,
  //     "string.email": VALIDATION_MESSAGES.EMAIL_INVALID,
  //     "any.required": VALIDATION_MESSAGES.EMAIL_REQUIRED,
  //   }),

  login_id: Joi.string() // email or username
    .trim()
    .required()
    .messages({
      "string.empty": "Email or Username is required.",
      "any.required": "Email or Username is required.",
    }),

  password: Joi.string().min(6).max(20).required().messages({
    "string.empty": VALIDATION_MESSAGES.PASSWORD_REQUIRED,
    "string.min": VALIDATION_MESSAGES.PASSWORD_MIN,
    "string.max": VALIDATION_MESSAGES.PASSWORD_MAX,
    "any.required": VALIDATION_MESSAGES.PASSWORD_REQUIRED,
  }),
});

/***
 * =================================
 * ! CHANGE PASSWORD VALIDATION ERROR SCHEMA
 * ==================================
 */

export const ChangePasswordSchema = Joi.object({
  oldPassword: Joi.string().required().messages({
    "string.empty": "Old password is required.",
    "any.required": "Old password is required.",
  }),

  newPassword: Joi.string()
    .min(6)
    .max(20)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])"))
    .required()
    .messages({
      "string.empty": "New password is required.",
      "string.min": "New password must be at least 6 characters.",
      "string.max": "New password must not exceed 20 characters.",
      "string.pattern.base":
        "New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      "any.required": "New password is required.",
    }),
  confirmPassword: Joi.string()
    .required()
    .custom((value, helpers) => {
      const { newPassword } = helpers.state.ancestors[0];
      if (value !== newPassword) {
        return helpers.error("any.only");
      }
      return value;
    })
    .messages({
      "any.only": "Confirm password must match new password.",
      "string.empty": "Confirm password is required.",
    }),
});
