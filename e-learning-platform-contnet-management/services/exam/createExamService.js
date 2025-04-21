const Exam = require('../../models/exam-model')
const ExamCreateDTO = require('../../dtos/exam/examCreateDTO')
const examValidation = require('../../validators/examDataValidation')
const createExamService = async (examData) => {
    const examCreateDTO = new ExamCreateDTO(examData)
    const { valid, ...dtoWithoutSuccess } = examCreateDTO
    if (!valid) {
        return {
            success: false,
            message: "Invalid course data.",
            statusCode: 400
        }
    }
    const fieldsToValidate = Object.keys(dtoWithoutSuccess);
    const validationResult = examValidation(dtoWithoutSuccess, fieldsToValidate);
    if (!validationResult.valid) {
        return {
            success: false,
            message: 'Invalid exam data.',
            validationResult,
            statusCode: 400
        };
    }
    try {
        const newExam = new Exam(dtoWithoutSuccess)
        const savedExam = await newExam.save()
        return {
            success: true,
            message: 'Exam created successfully',
            data: savedExam,
            statusCode: 201
        };
    } catch (error) {
        console.error('Error creating exam:', error); // Log the error for debugging
        return {
            success: false,
            message: 'Failed to create exam. Please try again.',
            statusCode: 500
        }
    }
}
module.exports = createExamService
