class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Format validation errors from various sources into a consistent structure
 */
const formatValidationError = (err) => {
    if (err.errors) {
        return Object.values(err.errors).map(error => ({
            field: error.path,
            message: error.message
        }));
    }
    return [{ message: err.message }];
};

/**
 * Handle specific database errors
 */
const handleDatabaseError = (err) => {
    // Prisma specific errors
    if (err.code === 'P2002') {
        return {
            statusCode: 400,
            message: 'A record with that value already exists.'
        };
    }
    if (err.code === 'P2025') {
        return {
            statusCode: 404,
            message: 'Record not found.'
        };
    }
    // MongoDB specific errors
    if (err.name === 'CastError') {
        return {
            statusCode: 400,
            message: `Invalid ${err.path}: ${err.value}`
        };
    }
    return null;
};

/**
 * Handle authentication and authorization specific errors
 */
const handleAuthError = (err) => {
    if (err.message.includes('Authorization header missing')) {
        return {
            statusCode: 401,
            message: 'Authorization header missing or invalid'
        };
    }
    if (err.message.includes('Authentication service unavailable')) {
        return {
            statusCode: 503,
            message: 'Authentication service is temporarily unavailable'
        };
    }
    if (err.message.includes('Access denied')) {
        return {
            statusCode: 403,
            message: 'Access denied: insufficient permissions'
        };
    }
    return null;
};

/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
    // Log error in development
    if (process.env.NODE_ENV === 'development') {
        console.error('Error details:', {
            name: err.name,
            message: err.message,
            stack: err.stack,
            ...(err.response && { responseData: err.response.data })
        });
    }

    // Default status code and message
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong';
    let errors = null;

    // Handle authentication errors
    const authError = handleAuthError(err);
    if (authError) {
        statusCode = authError.statusCode;
        message = authError.message;
    }
    // Handle axios errors (for auth service communication)
    else if (err.isAxiosError) {
        statusCode = err.response?.status || 500;
        message = err.response?.data?.message || 'Authentication service error';
        if (!err.response) {
            statusCode = 503;
            message = 'Authentication service is unavailable';
        }
    }
    // Handle validation errors
    else if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation Error';
        errors = formatValidationError(err);
    }
    // Handle database errors
    else {
        const dbError = handleDatabaseError(err);
        if (dbError) {
            statusCode = dbError.statusCode;
            message = dbError.message;
        }
    }

    // Prepare response object
    const errorResponse = {
        success: false,
        status: statusCode >= 400 && statusCode < 500 ? 'fail' : 'error',
        message,
        ...(errors && { errors }),
        ...(process.env.NODE_ENV === 'development' && {
            stack: err.stack,
            error: err.name,
            ...(err.response && { responseData: err.response.data })
        })
    };

    // Return error response
    res.status(statusCode).json(errorResponse);
};

module.exports = {
    AppError,
    errorHandler
};