const Course = require("../../models/course-model");

const getAllCoursesService = async (limit, offset) => {
    try {
        const courses = await Course.find()
            .sort({ "rating.average": -1 }) // Sort by rating.average in descending order
            .limit(limit)
            .skip(offset);
        if (courses.length === 0 || courses === null) {
            return {
                success: true,
                message: "No courses found.",
                data: [],
                statusCode: 404
            };
        }
        return {
            success: true,
            message: "Courses fetched successfully",
            data: courses,
            statusCode: 200
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to fetch courses. Please try again.",
            statusCode: 500
        };
    }



}
module.exports = getAllCoursesService