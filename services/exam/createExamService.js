const Exam = require('../../models/exam-model')
const Section = require('../../models/section-model')
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
        // Check if section exists before creating the exam
        const section = await Section.findById(dtoWithoutSuccess.sectionId);
        if (!section) {
            return {
                success: false,
                message: 'Section not found. Cannot create exam.',
                statusCode: 404
            };
        }
        const newExam = new Exam(dtoWithoutSuccess)
        const savedExam = await newExam.save()
        // Update the section to include the new exam
        await Section.findByIdAndUpdate(dtoWithoutSuccess.sectionId, { $push: { exams: savedExam._id } });
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
