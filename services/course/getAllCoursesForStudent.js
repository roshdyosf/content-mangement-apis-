const Course = require("../../models/course-model");
const Enrollment = require("../../models/enrollment-model");

/**
 * Service to get all courses a student is enrolled in.
 * @param {String} userId - The ID of the student.
 * @param {Number} limit - The maximum number of courses to return.
 * @param {Number} offset - The number of courses to skip.
 * @returns {Object} - An object containing the success status, message, data, and status code.
 */
const getAllCoursesForStudentService = async (userId, limit, offset) => {
    try {
        // Find all course IDs the student is enrolled in
        const enrollments = await Enrollment.find({ studentId: userId })
            .select('courseId')
            .exec();

        const enrolledCourseIds = enrollments.map(enrollment => enrollment.courseId);

        // Get the total number of enrolled courses
        const totalCourses = enrolledCourseIds.length;

        // Fetch the paginated list of enrolled courses
        const courses = await Course.find({ '_id': { $in: enrolledCourseIds } })
            .skip(offset)
            .limit(limit)
            .populate("educatorId", "firstName lastName profilePicture")
            .exec();

        return {
            success: true,
            message: "Enrolled courses fetched successfully.",
            data: {
                courses,
                totalCourses,
                offset,
                limit
            },
            statusCode: 200
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to fetch enrolled courses. Please try again.",
            statusCode: 500
        };
    }
};

module.exports = {
    getAllCoursesForStudentService
};

