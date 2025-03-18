const educatorRoleCheck = (req, res, next) => {
    const role = req.userInfo.role
    if (!role || role !== 'educator')
        return res.status(403).json({
            success: false,
            message: 'Access denied. educator rights needed.'
        })
    next()
}

module.exports = educatorRoleCheck;