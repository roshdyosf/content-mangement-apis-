const Course = require("../../models/course-model");

const getAllCoursesForTag = async (tag, limit, offset) => {
    try {
        let courses;
        if (!tag) {
            courses = await Course.find({ approved: true })
                .sort({ "rating.average": -1 })
                .limit(limit)
                .skip(offset);
            return {
                success: true,
                message: "No tag provided. Returning all approved courses.",
                data: courses,
                statusCode: 200
            };
        } else {
            courses = await Course.find({ tags: tag, approved: true });
            if (courses.length === 0) {
                return {
                    success: true,
                    message: "No courses found for the given tag.",
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
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to fetch courses. Please try again.",
            statusCode: 500
        };
    }
};

module.exports = getAllCoursesForTag