const Exam = require("../../models/exam-model");
const Section = require("../../models/section-model")
const getSectionByIdService = async (SectionId) => {

    try {
        // Query for section by id and approved only
        const section = await Section.findOne({ _id: SectionId })
            .populate({
                path: 'videos',
                select: 'title order approved createdAt updatedAt',
            })
            .populate({
                path: 'exams',
                select: 'title order approved createdAt updatedAt'
            });
        if (!section) {
            return {
                success: false,
                message: 'No section found with this id.',
                statusCode: 404
            };
        }
        return {
            success: true,
            message: "section fetched successfully.",
            data: section,
            statusCode: 200
        };


    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Failed to fetch the section. Please try again.',
            statusCode: 500
        }
    }
}
module.exports = getSectionByIdService