const Course = require('../../models/course-model')
const courseApprovalService = async (courseId, approved) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { approved: approved },
            { new: true }
        );
        if (!updatedCourse) {
            return {
                success: false,
                message: "No course found with this id.",
                statusCode: 404
            };
        }
        return {
            success: true,
            message: "Course approval updated successfully.",
            data: updatedCourse,
            statusCode: 200
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to update course approval. Please try again.",
            statusCode: 500
        };
    }
};


module.exports = courseApprovalService