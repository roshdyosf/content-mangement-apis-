const axios = require("axios");
const handleResponse = require("../utils/errorHandler");
/**
 * Validate the authentication token
 */
const validateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const apiKey = req.headers["x-service-key"] || req.headers["X-Service-Key"];
    if (process.env.INTERNAL_API_KEY == apiKey) { 
      return next();
    }
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return handleResponse(res, {
        success: false,
        message: "Authorization header missing or invalid",
        statusCode: 401,
      });
    }

    const token = authHeader.split(" ")[1];

    try {
      const userServiceUrl =
        process.env.USER_SERVICE_URL || "http://3.70.227.2:5003/api/v1/ums";
      const response = await axios.post(
        `${userServiceUrl}/auth/validate`,
        { token },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Service-Key": process.env.INTERNAL_API_KEY,
          },
          timeout: 5000,
        }
      );

      if (!response.data.valid) {
        console.error(response);
        return handleResponse(res, {
          success: false,
          message: "Invalid or expired token",
          statusCode: 401,
        });
      }

      // Convert id to string and attach user info to request
      const user = response.data.user;
      user.id = user.id.toString();
      req.userInfo = user;

      // Move to next middleware
      next();
    } catch (error) {
      console.error("Auth service error:", error.message);
      console.error("Request IP:", req.ip);

      // Handle different types of axios errors
      if (
        error.code === "ECONNREFUSED" ||
        error.code === "ECONNABORTED" ||
        !error.response
      ) {
        return handleResponse(res, {
          success: false,
          message: "Authentication service is temporarily unavailable",
          statusCode: 503,
        });
      }

      // Handle HTTP errors from auth service
      const statusCode = error.response?.status || 500;
      const message = error.response?.data?.message || "Authentication failed";

      return handleResponse(res, {
        success: false,
        message,
        statusCode,
      });
    }
  } catch (error) {
    console.error("Unexpected auth error:", error);
    return handleResponse(res, {
      success: false,
      message: "Authentication failed due to server issue",
      statusCode: 500,
    });
  }
};

const requireRole = (roles) => {
  return (req, res, next) => {
    // Ensure roles is an array
    const requiredRoles = Array.isArray(roles) ? roles : [roles];

    if (!req.userInfo) {
      return handleResponse(res, {
        success: false,
        message: "User not authenticated",
        statusCode: 401,
      });
    }

    if (!requiredRoles.includes(req.userInfo.role)) {
      return handleResponse(res, {
        success: false,
        message: "Access denied: insufficient permissions",
        statusCode: 403,
      });
    }

    next();
  };
};

/**
 * Create middleware for testing without actual authentication
 */
const mockAuthMiddleware = (
  role = "Educator",
  id = "edu_123",
  firstName = "E mock user",
  lastName = "e last"
) => {
  return (req, res, next) => {
    req.userInfo = {
      userId: id,
      email: "mock@example.com",
      firstName: firstName,
      lastName: lastName,
      role: role,
    };
    next();
  };
};

module.exports = {
  validateToken,
  requireRole,
  mockAuthMiddleware,
};
