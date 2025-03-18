const Course = require("../../models/course-model");

const getAllCoursesForEducatorService = async (educatorId) => {
    try {
        const courses = await Course.find({ educatorId: educatorId, approved: true });
        if (courses.length === 0) {
            return {
                success: true,
                message: "No courses found for this educator.",
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

module.exports = getAllCoursesForEducatorService