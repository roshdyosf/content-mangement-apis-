const Course = require('../../models/course-model')
const deleteSectionService = require('../section/deleteSectionService')
const Section = require('../../models/section-model')
const deleteCourse = async (courseId) => {
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return {
                success: false,
                message: "Wrong course id!",
                statusCode: 404
            };
        }
        // Delete all sections associated with the course
        if (course.sections && course.sections.length > 0) {
            await Promise.all(
                course.sections.map(sectionId => deleteSectionService(sectionId, courseId))
            );
        } else {
            // Defensive: If sections array is empty, double-check for orphaned sections
            const orphanedSections = await Section.find({ courseId });
            await Promise.all(
                orphanedSections.map(section => deleteSectionService(section._id, courseId))
            );
        }
        // delete the course itself
        await Course.findByIdAndDelete(courseId);
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