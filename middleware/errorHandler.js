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
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
    // Log error in development
    if (process.env.NODE_ENV === 'development') {
        console.error('Error details:', {
            name: err.name,
            message: err.message,
            stack: err.stack
        });
    }

    // Default status code and message
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong';
    let errors = null;

    // Handle specific error types
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation Error';
        errors = formatValidationError(err);
    } else if (err.name === 'JsonWebTokenError' || err.name === 'NotAuthorizedError') {
        statusCode = 401;
        message = 'Invalid token. Please log in again.';
    } else if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Your token has expired. Please log in again.';
    } else if (err.name === 'MulterError') {
        statusCode = 400;
        message = 'File upload error';
        if (err.code === 'LIMIT_FILE_SIZE') {
            message = 'File is too large. Maximum size is 5MB';
        }
    } else if (err.name === 'RateLimitExceeded') {
        statusCode = 429;
        message = 'Too many requests. Please try again later.';
    }

    // Handle database errors
    const dbError = handleDatabaseError(err);
    if (dbError) {
        statusCode = dbError.statusCode;
        message = dbError.message;
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
            details: err
        })
    };

    // Return error response
    res.status(statusCode).json(errorResponse);
};

module.exports = {
    AppError,
    errorHandler
};