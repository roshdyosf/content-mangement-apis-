const Course = require('../../models/course-model');
const SavedCourses = require('../../models/save-model');

const saveCourseService = async (courseId, studentId) => {
    try {
        if (!courseId || courseId.length !== 24) {
            return { success: false, message: 'Invalid courseId' };
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return {
                success: false,
                message: 'Course not found or wrong courseId',
                statusCode: 404
            };
        }

        // Find or create the saved courses document for the student
        let savedEntry = await SavedCourses.findOne({ studentId });
        if (savedEntry) {
            // Check if course is already saved
            if (savedEntry.courses.includes(courseId)) {
                return {
                    success: false,
                    message: 'Course already saved',
                    statusCode: 400
                };
            }
            // Add course to the array
            savedEntry.courses.push(courseId);
            await savedEntry.save();
        } else {
            // Create a new saved courses document for the student
            savedEntry = new SavedCourses({
                courses: [courseId],
                studentId,
            });
            await savedEntry.save();
        }
        return {
            success: true,
            message: 'Course saved successfully',
            statusCode: 201
        };
    } catch (error) {
        console.error('Error saving course:', error);
        return {
            success: false,
            message: 'Error saving course',
            statusCode: 500
        };
    }
};

module.exports = saveCourseService;