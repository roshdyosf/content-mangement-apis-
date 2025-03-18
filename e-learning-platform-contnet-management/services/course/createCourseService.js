const Course = require("../../models/course-model");
const courseValidation = require('../../validators/courseDataValidation')
const CourseCreateDTO = require('../../dtos/course/courseCreateDTO')
const createCourse = async (courseData) => {

    const courseCreateDTO = new CourseCreateDTO(courseData)
    const { valid, ...dtoWithoutSuccess } = courseCreateDTO;

    if (!valid) {
        return {
            success: false,
            message: "Invalid course data.",
            statusCode: 400
        }
    }
    const fieldsToValidate = Object.keys(dtoWithoutSuccess);
    const validationResult = courseValidation(dtoWithoutSuccess, fieldsToValidate);
    if (!validationResult.valid) {
        return {
            success: false,
            message: 'Invalid course data.',
            validationResult,
            statusCode: 400

        };
    }

    try {
        const newCourse = new Course(dtoWithoutSuccess);
        const savedCourse = await newCourse.save();
        return {
            success: true,
            message: 'Course created successfully',
            data: savedCourse,
            statusCode: 201
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: 'Failed to create course. Please try again.',
            statusCode: 500
        };
    }
}
module.exports = createCourse;