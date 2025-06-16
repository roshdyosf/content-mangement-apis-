const Course = require('../../models/course-model');

const updateCourseRatingService = async (courseId, newRating) => {
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return {
                success: false,
                message: 'Course not found.',
                statusCode: 404
            };
        }

        // Calculate the new average rating
        const totalRating = (course.rating.average * course.rating.count) + newRating;
        const newCount = course.rating.count + 1;
        const newAverage = totalRating / newCount;

        // Update the course with the new rating
        course.rating.average = newAverage;
        course.rating.count = newCount;
        await course.save();

        return {
            success: true,
            message: 'Course rating updated successfully.',
            data: course,
            statusCode: 200
        };
    } catch (error) {
        console.error('Error updating course rating:', error);
        return {
            success: false,
            message: 'Failed to update course rating. Please try again.',
            statusCode: 500
        };
    }
};

module.exports = updateCourseRatingService;