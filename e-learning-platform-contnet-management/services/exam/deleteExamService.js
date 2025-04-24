const Exam = require("../../models/exam-model")
const deleteExamService = async (examId) => {

    try {
        const exam = await Exam.findByIdAndDelete(examId)
        if (!exam) {
            return {
                success: false,
                message: 'No exam found with this id.',
                statusCode: 404
            };
        }
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