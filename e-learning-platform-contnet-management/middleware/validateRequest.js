const validateId = (idName, source = 'params') => (req, res, next) => {
    let id;

    if (source === 'params') {
        id = req.params[idName];
    } else if (source === 'body') {
        id = req.body[idName];
    }

    if (!id) {
        return res.status(400).json({
            success: false,
            message: `${idName} is required.`,
        });
    }

    next();
};

const validateApproval = (req, res, next) => {
    const { approval } = req.body;

    if (typeof approval !== 'boolean') {
        return res.status(400).json({
            success: false,
            message: "Approval value must be a boolean.",
        });
    }

    next();
};

module.exports = { validateId, validateApproval };