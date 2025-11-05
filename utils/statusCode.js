export const STATUS_CODES = {
  
  //! Success Responses
  OK: 200, // Standard success
  CREATED: 201, // New resource created
  ACCEPTED: 202, // Request accepted but processing later
  NO_CONTENT: 204, // Successful but no content returned

  //! Client Error Responses

  BAD_REQUEST: 400, // Invalid input or request data
  UNAUTHORIZED: 401, // User not logged in
  FORBIDDEN: 403, // User does not have permission
  NOT_FOUND: 404, // Resource not found
  METHOD_NOT_ALLOWED: 405, // HTTP method not supported
  CONFLICT: 409, // Duplicate or conflicting data
  UNPROCESSABLE_ENTITY: 422, // Validation error
  TOO_MANY_REQUESTS: 429, // Rate limit exceeded

  //! Server Error Responses

  INTERNAL_SERVER_ERROR: 500, // General server error
  NOT_IMPLEMENTED: 501, // API endpoint not implemented
  BAD_GATEWAY: 502, // Invalid response from upstream server
  SERVICE_UNAVAILABLE: 503, // Server temporarily unavailable
  GATEWAY_TIMEOUT: 504, // Upstream server timeout
};
