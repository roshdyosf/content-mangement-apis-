const genericValidator = require('./genericValidator');
const videoValidation = (videoData, fieldsToValidate) => {
    const validations = {
        title: 'string',
        order: 'number',
        sectionId: "string",
        courseId: "string"
    };
    return genericValidator(videoData, validations, fieldsToValidate);
};

module.exports = videoValidation;