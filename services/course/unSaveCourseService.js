const SavedCourses = require('../../models/save-model');
const unSaveCourseService = async (courseId, studentId) => {
    try {
        if (!courseId || courseId.length !== 24) {
            return { success: false, message: 'Invalid courseId' };
        }

        // Find the saved courses document for the student
        const savedEntry = await SavedCourses.findOne({ studentId });
        if (!savedEntry || !savedEntry.courses.includes(courseId)) {
            return {
                success: false,
                message: 'Course not found in saved courses',
                statusCode: 404
            };
        }

        // Remove the course from the saved courses array
        savedEntry.courses = savedEntry.courses.filter(id => id.toString() !== courseId);
        await savedEntry.save();

        return {
            success: true,
            message: 'Course unSaved successfully',
            statusCode: 200
        };

    } catch (error) {
        console.error('Error unSaving course:', error);
        return {
            success: false,
            message: 'Error server error while unSaving course',
            statusCode: 500
        };
    }
};
module.exports = unSaveCourseService;