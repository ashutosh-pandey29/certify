export const MESSAGES = {
  AUTH: {
    REGISTER_SUCCESS: "Registration successful!",
    LOGIN_SUCCESS: "Login successful! Redirecting to your dashboard...",
    LOGOUT_SUCCESS: "You’ve been logged out successfully.",
    INVALID_CREDENTIALS: "Incorrect email or password. Please try again.",
    USER_NOT_FOUND: "No account found with this email address.",
    USER_ALREADY_EXISTS: "An account with this email already exists.",
    PASSWORD_RESET_SUCCESS: "Your password has been reset successfully.",
    PASSWORD_RESET_FAILED: "Password reset failed. Please try again later.",
    TOKEN_EXPIRED: "Your session has expired. Please log in again.",
    UNAUTHORIZED: "You need to be logged in to access this resource.",
  },

  STUDENT: {
    CREATED: "Student record created successfully",
    UPDATED: "Student details updated successfully!",
    DELETED: "Student record deleted successfully.",
    NOT_FOUND: "Student record not found.",
    DUPLICATE_ENTRY: "A student with this email or ID already exists.",
    UPLOAD_SUCCESS: "Student data uploaded successfully!",
    UPLOAD_FAILED: "Failed to upload student data. Please check your file.",
  },

  CERTIFICATE: {
    GENERATED: "Certificate generated successfully 🏆",
    REGENERATED: "Certificate re-generated successfully.",
    SENT_EMAIL: "Certificate sent to student's email successfully.",
    VERIFIED: "Certificate verified successfully ✔️",
    INVALID: "Invalid certificate ID or data.",
    NOT_FOUND: "No certificate found with this ID.",
    DELETED: "Certificate deleted successfully.",
    UPDATED: "Certificate details updated successfully.",
  },

  FILE: {
    UPLOAD_SUCCESS: "File uploaded successfully!",
    UPLOAD_FAILED: "File upload failed. Please try again.",
    INVALID_FORMAT: "Invalid file format. Please upload a valid Excel or PDF file.",
    EMPTY_FILE: "The uploaded file is empty or invalid.",
  },

  SYSTEM: {
    SERVER_ERROR: "Internal Server Error. Please try again later.",
    BAD_REQUEST: "Invalid or missing input data.",
    FORBIDDEN: "You don’t have permission to perform this action.",
    NOT_FOUND: "The requested resource could not be found.",
    DATABASE_ERROR: "Database error occurred. Please try again.",
    NETWORK_ERROR: "Network error. Please check your connection.",
  },

  COMMON: {
    SUCCESS: "Action completed successfully.",
    FAILURE: "Something went wrong. Please try again.",
    INVALID_INPUT: "Please provide valid input values.",
    PROCESSING: "Processing your request... please wait.",
  },
};
