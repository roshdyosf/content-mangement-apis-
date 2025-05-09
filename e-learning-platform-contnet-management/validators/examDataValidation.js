const genericValidator = require('./genericValidator');
const examValidation = (examData, fieldsToValidate) => {
    const validations = {
        title: 'string',
        educatorId: 'string',
        courseId: 'string',
        sectionId: 'string',
        question: 'string',
        answer: 'string',
        choice: 'string',
        examId: 'string'
    };
    return genericValidator(examData, validations, fieldsToValidate);

};

module.exports = examValidation;