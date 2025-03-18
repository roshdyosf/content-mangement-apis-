const moderatorRoleCheck = (req, res, next) => {
    const role = req.userInfo.role
    if (!role || role !== 'moderator')
        return res.status(403).json({
            success: false,
            message: 'Access denied. moderator rights needed.'
        })
    next()
}

module.exports = moderatorRoleCheck;