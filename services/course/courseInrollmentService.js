const Course = require('../../models/course-model');
const enrollmentCountUpdate = async (courseId, action) => {
    try {
        
        console.log(`Updating enrollment count for course ID: ${courseId} with action: ${action}`);
        const course = await Course.findById(courseId);
        if (!course) {
            return {
                success: false,
                message: "Course not found.",
                statusCode: 404
            };
        }

        if (action === 'ADD') {
            course.enrollmentCount += 1;
        } else if (action === 'REMOVE') {
            course.enrollmentCount -= 1;
        } else {
            return {
                success: false,
                message: "Invalid action specified.",
                statusCode: 400
            };
        }

        await course.save();
        console.log(`Enrollment count updated successfully for course ID: ${courseId}. New count: ${course.enrollmentCount}`);
        return {
            success: true,
            message: "Enrollment count updated successfully.",
            data: course.enrollmentCount,
            statusCode: 200
        };
    } catch (error) {
        console.error(error);
        console.log(`Failed to update enrollment count for course ID: ${courseId}. Error: ${error.message}`);
        return {
            success: false,
            message: "Failed to update enrollment count. Please try again.",
            statusCode: 500
        };
    }

}
module.exports = enrollmentCountUpdate;