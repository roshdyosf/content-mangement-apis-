const Exam = require("../../models/exam-model")
const getExamService = async (sectionId) => {

    try {
        const availableExams = await Exam.find({ sectionId: sectionId })
        if (!availableExams || availableExams.length === 0) {
            return {
                success: false,
                message: "No exams found for this section.",

                data: [],
                statusCode: 404
            };
        }
        return {
            success: true,
            message: "exams fetched successfully.",
            data: availableExams,
            statusCode: 200
        };


    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Failed to fetch the exam. Please try again.',
            statusCode: 500
        }
    }
}
module.exports = getExamService