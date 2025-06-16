const Section = require("../../models/section-model");

const getUnApprovedSectionsService = async () => {
    try {
        const sections = await Section.find({ approved: false });
        if (sections.length === 0) {
            return {
                success: true,
                message: "No unapproved sections found.",
                data: [],
                statusCode: 404
            };
        }
        return {
            success: true,
            message: "Sections fetched successfully",
            data: sections,
            statusCode: 200
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to fetch sections. Please try again.",
            statusCode: 500
        };
    }
};
module.exports = getUnApprovedSectionsService