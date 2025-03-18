const genericValidator = require('./genericValidator');
const courseValidation = (courseData, fieldsToValidate) => {
    const validations = {
        title: 'string',
        educator: 'string',
        description: 'string',
        educatorId: 'string',
        price: 'number',
        rating: 'number'
    };
    return genericValidator(courseData, validations, fieldsToValidate);

};

module.exports = courseValidation;