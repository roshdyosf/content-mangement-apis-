const Section = require("../../models/section-model");
const Course = require('../../models/course-model')
const sectionDataValidation = require('../../validators/sectionDataValidation');
const SectionCreateDTO = require('../../dtos/section/SectionCreateDTO')
const createSection = async (sectionData) => {

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