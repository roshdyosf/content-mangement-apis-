const Section = require('../../models/section-model');

const getAllSections = async (courseId) => {
    try {

        const sections = await Section.find({ courseId: courseId }).sort({ order: 1 });

        if (!sections || sections.length === 0) {
            return {
                success: false,
                message: "No sections found for this course.",
                data: [],
                statusCode: 404
            };
        }
        return {
            success: true,
            message: "Sections fetched successfully.",
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
module.exports = getAllSections;