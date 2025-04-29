const Section = require("../../models/section-model");
const sectionDataValidation = require('../../validators/sectionDataValidation');
const SectionUpdateDTO = require('../../dtos/section/sectionUpdateDTO');


const updateSection = async (sectionId, sectionData, courseId) => {
    try {
        // Create a DTO instance
        const sectionUpdateDTO = new SectionUpdateDTO(sectionData);
        const { valid, ...dtoWithoutSuccess } = sectionUpdateDTO;
        if (!valid) {
            return {
                success: false,
                message: "Invalid section data. At least one field (title, description, order) is required, and order must be a number if provided.",
                statusCode: 400
            };
        }

        const fieldsToValidate = Object.keys(dtoWithoutSuccess);
        // Validate the DTO
        const validationResult = sectionDataValidation(dtoWithoutSuccess, fieldsToValidate);
        if (!validationResult.valid) {
            return {
                success: false,
                message: 'Invalid section data.',
                validationResult,
                statusCode: 400
            };
        }

        const section = await Section.findById(sectionId);
        if (!section) {
            return {
                success: false,
                message: "Wrong section id!",
                statusCode: 404
            };
        }
        if (courseId.toString() !== section.courseId.toString()) {
            return {
                success: false,
                message: 'please don`t hack us.',
                statusCode: 400
            };
        }
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            { ...dtoWithoutSuccess, approved: false },
            { new: true }
        );

        return {
            success: true,
            message: "Section updated successfully.",
            data: updatedSection,
            statusCode: 200
        };

    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "An error has occurred. Please try again!",
            statusCode: 500
        };
    }
};
module.exports = updateSection