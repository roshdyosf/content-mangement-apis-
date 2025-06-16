const Exam = require("../../models/exam-model")
const Section = require("../../models/section-model");
const deleteExamService = async (examId, courseId) => {

    try {
        const exam = await Exam.findById(examId);
        if (!exam) {
            return {
                success: false,
                message: 'No exam found with this id.',
                statusCode: 404
            };
        }
        if (courseId.toString() !== exam.courseId.toString()) {
            return {
                success: false,
                message: 'please don`t hack us.',
                statusCode: 400
            };
        }
        await Exam.findByIdAndDelete(examId);

        // Remove the exam from the section's exams array

        await Section.findByIdAndUpdate(exam.sectionId, { $pull: { exams: examId } });

        return {
            success: true,
            message: "exam deleted successfully.",
            data: exam,
            statusCode: 200
        };


    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Failed to delete the exam. Please try again.',
            statusCode: 500
        }
    }
}
module.exports = deleteExamService