export const VALIDATION_MESSAGES = {
  REQUIRED: "{#label} is required.",
  INVALID_TYPE: "{#label} must be a valid {#type}.",
  MIN: "{#label} must be at least {#limit} characters long.",
  MAX: "{#label} must not exceed {#limit} characters.",
  LENGTH: "{#label} must be exactly {#limit} characters long.",
  INVALID_FORMAT: "{#label} format is invalid.",
  INVALID_VALUE: "Invalid value provided for {#label}.",
  INVALID_INPUT: "Please provide a valid {#label}.",
  EMPTY: "{#label} cannot be empty.",
  PATTERN: "{#label} does not match the required pattern.",

  NAME_REQUIRED: "Name is required.",
  NAME_MIN: "Name must be at least 3 characters.",
  NAME_MAX: "Name must not exceed 30 characters.",

  EMAIL_REQUIRED: "Email address is required.",
  EMAIL_INVALID: "Please enter a valid email address.",

  PASSWORD_REQUIRED: "Password is required.",
  PASSWORD_MIN: "Password must be at least 6 characters.",
  PASSWORD_MAX: "Password must not exceed 20 characters.",
  PASSWORD_PATTERN:
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",

  CONFIRM_PASSWORD_REQUIRED: "Confirm password is required.",
  CONFIRM_PASSWORD_MATCH: "Confirm password must match the password.",

  ROLE_INVALID: "Role must be either student or admin.",
  TOKEN_INVALID: "Invalid or expired token.",
  UNAUTHORIZED: "You are not authorized to perform this action.",

  STUDENT_ID_REQUIRED: "Student ID is required.",
  COURSE_REQUIRED: "Course name is required.",
  CERTIFICATE_ID_REQUIRED: "Certificate ID is required.",
  DATE_INVALID: "Invalid date format.",

  FILE_REQUIRED: "Please upload a valid file.",
  FILE_INVALID_TYPE: "Only .xlsx or .pdf files are allowed.",
  FILE_EMPTY: "Uploaded file is empty or corrupted.",

  INTERNAL_ERROR: "Internal server error. Please try again later.",
  BAD_REQUEST: "Invalid or incomplete request data.",
  FORBIDDEN: "You don't have permission to perform this action.",
};
