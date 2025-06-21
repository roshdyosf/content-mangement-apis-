const Exam = require('../../models/exam-model')
const Section = require('../../models/section-model')
const ExamCreateDTO = require('../../dtos/exam/examCreateDTO')

const createExamService = async (examData, educatorId) => {
    const examCreateDTO = new ExamCreateDTO(examData)
    if (!examCreateDTO.valid) {
        return {
            success: false,
            message: examCreateDTO.error || "Invalid exam data.",
            statusCode: 400
        }
    }
    try {
        // Check if section exists before creating the exam
        const section = await Section.findById(examCreateDTO.sectionId);
        if (!section) {
            return {
                success: false,
                message: 'Section not found. Cannot create exam.',
                statusCode: 404
            };
        }
        // Only pick allowed fields
        const examFields = {
            title: examCreateDTO.title,
            sectionId: examCreateDTO.sectionId,
            courseId: examCreateDTO.courseId,
            mcq: examCreateDTO.mcq,
            educatorId: educatorId
        };
        const newExam = new Exam(examFields)
        const savedExam = await newExam.save()
        // Update the section to include the new exam
        await Section.findByIdAndUpdate(examCreateDTO.sectionId, { $push: { exams: savedExam._id } });
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
