const Section = require("../../models/section-model");
const Course = require('../../models/course-model')
const sectionDataValidation = require('../../validators/sectionDataValidation');
const SectionCreateDTO = require('../../dtos/section/SectionCreateDTO')

// Accept educatorId as a parameter
const createSection = async (sectionData, educatorId) => {
    const sectionCreateDTO = new SectionCreateDTO(sectionData)
    const { valid, ...dtoWithoutSuccess } = sectionCreateDTO;

    if (!valid) {
        return {
            success: false,
            message: "Invalid section data. Title, description, and courseId are required, and order must be a number if provided.",
            statusCode: 400
        };
    }
    // Extract field names from the DTO
    const fieldsToValidate = Object.keys(dtoWithoutSuccess);

    const validationResult = sectionDataValidation(dtoWithoutSuccess, fieldsToValidate);

    if (!validationResult.valid) {
        return {
            success: false,
            message: 'Invalid section data.',
            validationResult,
            statusCode: 400
        };
    }
    try {
        // Check if course exists and educator matches in one query
        const course = await Course.findOne({
            _id: dtoWithoutSuccess.courseId,
            educatorId: educatorId
        });
        if (!course) {
            return {
                success: false,
                message: 'Course not found or educator mismatch. Cannot create section.',
                statusCode: 404
            };
        }
        const newSection = new Section(dtoWithoutSuccess);
        const savedSection = await newSection.save();
        await Course.findByIdAndUpdate(dtoWithoutSuccess.courseId, { $push: { sections: savedSection._id } });
        return {
            success: true,
            message: 'Section created successfully',
            data: savedSection,
            statusCode: 201
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Failed to create section. Please try again.',
            statusCode: 500
        };
    }
};

module.exports = createSection;