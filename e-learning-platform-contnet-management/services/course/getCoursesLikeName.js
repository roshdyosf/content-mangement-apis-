const Course = require("../../models/course-model");

const getCoursesLikeNameService = async (courseName, limit) => {
    try {
        const courses = await Course.find({ title: { $regex: courseName, $options: "i" }, approved: true })
            .sort({ "rating.average": -1 })
            .limit(limit)
        return {
            success: true,
            message: "Courses fetched successfully.",
            data: courses,
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
module.exports = getCoursesLikeNameService