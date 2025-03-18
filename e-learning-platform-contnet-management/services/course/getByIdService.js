const Course = require("../../models/course-model");

const getCourseById = async (courseId) => {
    try {
        const course = await Course.findById(courseId);
        if (!course || !course.approved) {
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