const axios = require("axios");
const { AppError } = require("./errorHandler");

/**
 * Validate the authentication token
 */
const validateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(new AppError("Authorization header missing or invalid", 401));
        }

        const token = authHeader.split(" ")[1];

        // Typically, we would validate the token against the user service
        try {
            const userServiceUrl =
                process.env.USER_SERVICE_URL || "http://127.0.0.1/api/v1/ums";
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
            console.log(`Auth service response: ${JSON.stringify(response.data)}`);
            if (!response.data.valid) {
                return next(new AppError("Invalid or expired token", 401));
            }
            response.data.user.id = response.data.user.id.toString();
            // Attach user info to request
            req.userInfo = response.data.user;
            next();

        } catch (axiosError) {
            // Handle network errors or service unavailable scenarios
            if (!axiosError.response) {
                console.error(`Auth service unavailable: ${axiosError.message}`);
                return next(new AppError("Authentication service unavailable", 503));
            } else if (!axiosError.message.includes("Invalid or expired token")) {
                // log the device ip for this request
                console.error(`Auth service error: ${axiosError.message}`);
                console.error(`Request IP: ${req.ip}`);
                return next(new AppError("Invalid Token", 401));
            }

            // Handle error response from auth service
            console.error(
                `Auth validation error: ${axiosError.response.data?.message || axiosError.message
                }`
            );
            return next(
                new AppError("Authentication failed", axiosError.response.status || 401)
            );
        }
    } catch (error) {
        if (error instanceof AppError) {
            next(error);
        } else {
            // Network error or internal error
            console.error(`Auth middleware error: ${error.message}`);
            next(new AppError("Authentication failed due to server issue", 500));
        }
    }
};

const requireRole = (roles) => {
    return (req, res, next) => {
        // Ensure roles is an array
        const requiredRoles = Array.isArray(roles) ? roles : [roles];

        if (!req.userInfo) {
            return next(new AppError("User not authenticated", 401));
        }

        if (!requiredRoles.includes(req.userInfo.role)) {
            return next(new AppError("Access denied: insufficient permissions", 403));
        }

        next();
    };
};

/**
 * Create middleware for testing without actual authentication
 */
const mockAuthMiddleware = (role = "Educator", id = "edu_123", name = "E mock user") => {
    return (req, res, next) => {
        req.userInfo = {
            userId: id,
            email: "mock@example.com",
            name: name,
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
