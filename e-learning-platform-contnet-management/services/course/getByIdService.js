const Course = require("../../models/course-model");

const getCourseById = async (courseId) => {
    try {
        // Populate sections and return their info
        const course = await Course.findOne({ _id: courseId, approved: true })
            .populate({
                path: 'sections',
                select: 'title order approved createdAt updatedAt',
            });

        if (!course) {
            return {
                success: false,
                message: "No course found with this id.",
                statusCode: 404
            };
        }
        return {
            success: true,
            message: "Course fetched successfully.",
            data: course,
            statusCode: 200
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to fetch the course. Please try again.",
            statusCode: 500
        };
    }
};
module.exports = getCourseById