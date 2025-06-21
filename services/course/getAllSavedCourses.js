const SavedCourses = require('../../models/save-model');
const getAllSavedCourses = async (studentId) => {
    try {
        if (!studentId) {
            return { success: false, message: 'Invalid studentId' };
        }

        // Find all saved courses for the student
        const savedCourses = await SavedCourses.find({ studentId })
            .populate('courses', 'title description price imageUrl createdAt')
            .exec();

        if (!savedCourses || savedCourses.length === 0) {
            return {
                success: false,
                message: 'No saved courses found for this student',
                statusCode: 404
            };
        }

        return {
            success: true,
            message: 'Saved courses retrieved successfully',
            data: savedCourses,
            statusCode: 200
        };

    } catch (error) {
        console.error('Error retrieving saved courses:', error);
        return {
            success: false,
            message: 'Error retrieving saved courses',
            statusCode: 500
        };
    }
}
module.exports = getAllSavedCourses;