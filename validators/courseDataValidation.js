const genericValidator = require('./genericValidator');
const courseValidation = (courseData, fieldsToValidate) => {
    const validations = {
        title: 'string',
        description: 'string',
        price: 'number',
        rating: 'number',
        level: 'string',
        tags: 'array<string>', // Added tags validation
    };

    return genericValidator(courseData, validations, fieldsToValidate);

};

module.exports = courseValidation;