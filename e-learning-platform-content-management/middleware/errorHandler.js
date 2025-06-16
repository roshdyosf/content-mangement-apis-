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
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {

    // Default status code and message
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong';

    // Handle specific error types
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = err.message;
    } else if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token. Please log in again.';
    } else if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Your token has expired. Please log in again.';
    } else if (err.code === 'P2002') {
        statusCode = 400;
        message = 'A record with that value already exists.';
    }

    // Return error response
    res.status(statusCode).json({
        success: false,
        status: statusCode >= 400 && statusCode < 500 ? 'fail' : 'error',
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = {
    AppError,
    errorHandler
};