const Course = require("../../models/course-model");

const getUnApprovedCoursesService = async () => {
    try {
        const courses = await Course.find({ approved: false });
        if (courses.length === 0) {
            return {
                success: true,
                message: "No unapproved courses found.",
                data: [],
                statusCode: 404
            };
        }
        return {
            success: true,
            message: "Courses fetched successfully",
            data: courses,
            statusCode: 200
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to fetch courses. Please try again.",
            statusCode: 500
        };
    }
};
module.exports = getUnApprovedCoursesService