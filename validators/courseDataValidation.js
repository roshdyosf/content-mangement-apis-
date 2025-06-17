const genericValidator = require('./genericValidator');
const courseValidation = (courseData, fieldsToValidate) => {
    const validations = {
        title: 'string',
        educator: 'string',
        description: 'string',
        price: 'number',
        rating: 'number',
        level: 'string',
    };

    return genericValidator(courseData, validations, fieldsToValidate);

};

module.exports = courseValidation;