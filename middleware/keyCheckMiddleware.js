const keyCheck = async (req, res, next) => {

    const apiKey = req.headers['X-Service-Key']
    || req.headers['x-service-key']
    
    if (!apiKey || apiKey !== process.env.INTERNAL_API_KEY) {
        return res.status(403).json({
            success: false,
            message: 'Forbidden: Invalid or missing API key'
        });
    }
    next();
}
module.exports = keyCheck;
