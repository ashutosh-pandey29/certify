import Joi from "joi";

export const studentValidationSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    "string.empty": "Name is required.",
    "string.min": "Name should be at least 2 characters long.",
    "string.max": "Name should not exceed 30 characters.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format.",
    "string.empty": "Email is required.",
  }),
  course: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Course name is required.",
    "string.min": "Course name should be at least 2 characters long.",
  }),
  isCertificateIssued: Joi.boolean().optional(),
});
