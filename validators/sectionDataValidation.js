const genericValidator = require('./genericValidator');

const sectionDataValidation = (sectionData, fieldsToValidate) => {

    const validations = {
        title: 'string',
        order: 'number',
        courseId: "string"
    };
    return genericValidator(sectionData, validations, fieldsToValidate);

}
module.exports = sectionDataValidation
