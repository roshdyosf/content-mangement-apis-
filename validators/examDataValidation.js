const genericValidator = require('./genericValidator');
const examValidation = (examData, fieldsToValidate) => {
    const validations = {
        title: 'string',
        courseId: 'string',
        sectionId: 'string',
        question: 'string',
        answerIndex: 'number',
        choice: 'string',
        examId: 'string'
    };
    return genericValidator(examData, validations, fieldsToValidate);

};

module.exports = examValidation;