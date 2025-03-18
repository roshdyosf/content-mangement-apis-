const Course = require('../../models/course-model')
const deleteSectionService = require('../section/deleteSectionService')
const deleteCourse = async (courseId) => {
    try {
        const course = await Course.findByIdAndDelete(courseId);
        if (!course) {
            return {
                success: false,
                message: "Wrong course id!",
                statusCode: 404
            };
        }

        await Promise.all(
            course.sections.map(sectionId => deleteSectionService(sectionId))
        );

        return {
            success: true,
            message: "Course deleted successfully",
            data: course,
            statusCode: 200
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to delete the current course. Please try again.",
            statusCode: 500
        };
    }
};
module.exports = deleteCourse;