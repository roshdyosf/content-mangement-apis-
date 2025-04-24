const Section = require("../../models/section-model")
const getSectionByIdService = async (SectionId) => {

    try {
        const section = await Section.findById(SectionId)
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