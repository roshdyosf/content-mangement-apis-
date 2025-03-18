const Section = require('../../models/section-model')

const sectionApprovalService = async (sectionId, approved) => {
    try {
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            { approved: approved },
            { new: true }
        );
        if (!updatedSection) {
            return {
                success: false,
                message: "No section found with this id.",
                statusCode: 404
            };
        }
        return {
            success: true,
            message: "Section approval updated successfully.",
            data: updatedSection,
            statusCode: 200
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to update section approval. Please try again.",
            statusCode: 500
        };
    }
};

module.exports = sectionApprovalService;