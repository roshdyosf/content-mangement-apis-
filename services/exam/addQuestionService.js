const QuestionCreateDTO = require("../../dtos/exam/questionCreateDto")
const Exam = require("../../models/exam-model")
const examValidation = require("../../validators/examDataValidation")
const addQuestionService = async (questionData) => {

    const questionCreateDTO = new QuestionCreateDTO(questionData)
    const { valid, examId, question, choices, answer } = questionCreateDTO
    if (!valid) {
        return {
            success: false,
            message: "Invalid question data. At least one field (examId, courseId, question, choices, answer) is required, and choices must be a an list of 4 string.",
            statusCode: 400
        };
    }
    const dtoWithoutSuccess = { examId, question, choices, answer };
    const fieldsToValidate = Object.keys(dtoWithoutSuccess);
    const validationResult = examValidation(dtoWithoutSuccess, fieldsToValidate);
    if (!validationResult.valid) {
        return {
            success: false,
            message: 'Invalid question data.',
            validationResult,
            statusCode: 400
        };
    }
    try {
        const exam = await Exam.findById(examId);
        if (!exam) {
            return {
                success: false,
                message: 'Invalid examId data. There is no such an examId',
                statusCode: 400
            };
        }
        exam.mcq.push({ question, choices, answer });
        await exam.save()
        return {
            success: true,
            message: 'Question added successfully.',
            statusCode: 200
        };
    } catch (error) {
        console.error('Error adding question:', error);

        return {
            success: false,
            message: 'Failed to add question. Please try again.',
            statusCode: 500
        };
    }

}
module.exports = addQuestionService