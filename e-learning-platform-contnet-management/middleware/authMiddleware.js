const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(401).json({
        success: false,
        message: 'access denied no token provided. please login to continue'
    })
    try {
        const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.userInfo = decodedTokenInfo
        next()
    } catch (e) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. Invalid token. Please login to continue.'
        })
    }

}
module.exports = authMiddleware