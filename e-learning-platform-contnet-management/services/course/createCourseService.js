const Course = require("../../models/course-model");
const courseValidation = require('../../validators/courseDataValidation')
const CourseCreateDTO = require('../../dtos/course/courseCreateDTO')
const fs = require('fs');
const { uploadToCloudinary } = require('../../helpers/cloudinaryHelper');
const createCourse = async (courseData, filePath) => {
    /**
     * Creates a new course with the provided data and video file path.
     * @param {Object} courseData - The data for the course to be created.
     * @param {string} filePath - The path to the video file associated with the course.
     * @returns {Promise<Object>} - An object containing the success status, message, and created course data or error details.
     */
    try {
        if (!filePath) {
            return {
                success: false,
                message: "No image file uploaded.",
                statusCode: 400
            };
        }

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

        const result = await uploadToCloudinary(filePath, 'image'); // Upload the image to Cloudinary
        // Add the image URL and public ID to the course data.


        const newCourse = new Course({
            ...dtoWithoutSuccess,
            imageUrl: result.url,
            imagePublicId: result.publicId
        });
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
    } finally {
        // Always delete the local file
        try {
            await fs.promises.unlink(filePath);
        } catch (err) {
            console.error('Error deleting local file:', err);
        }
    }
}
module.exports = createCourse;