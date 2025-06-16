const handleResponse = (res, serviceResult) => {
    const { success, message, data, statusCode = 200 } = serviceResult;

    if (!success) {
        return res.status(statusCode || 500).json({
            success: false,
            message: message || "Internal Server Error.",
            status: statusCode,
            data: null,
        });
    }

    return res.status(statusCode).json({
        success: true,
        message: message || "Request successful.",
        status: statusCode,
        data: data,
    });
};

module.exports = handleResponse