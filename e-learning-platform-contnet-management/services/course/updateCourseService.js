const Course = require('../../models/course-model')
const courseValidation = require('../../validators/courseDataValidation')
const CourseUpdateDTO = require('../../dtos/course/courseUpdateDTO')

const updateCourseInfo = async (courseId, courseData) => {


    try {
        // Validate the DTO instance
        const courseUpdateDTO = new CourseUpdateDTO(courseData);
        const { valid, ...dtoWithoutSuccess } = courseUpdateDTO;

        if (!valid) {
            return {
                success: false,
                message: "Invalid course data. At least one field (title, description, price, rating) is required, and price must be a number.",
                statusCode: 400
            };
        }
        const fieldsToValidate = Object.keys(dtoWithoutSuccess);

        // Validate the DTO
        const validationResult = courseValidation(dtoWithoutSuccess, fieldsToValidate);

        if (!validationResult.valid) {
            return {
                success: false,
                message: `Invalid course data.${validationResult}`,

                statusCode: 400
            };
        }

        const existingCourse = await Course.findById(courseId);
        if (!existingCourse) {
            return {
                success: false,
                message: "Wrong course id.",
                course: courseId,
                statusCode: 404
            };
        }

        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { ...courseUpdateDTO, approved: false },
            { new: true }
        );
        if (!updatedCourse) {
            return {
                success: false,
                message: "Wrong course id.",
                statusCode: 404
            };
        }
        return {
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
            statusCode: 200
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to update the current course. Please try again",
            statusCode: 500
        };
    }
};

module.exports = updateCourseInfo;