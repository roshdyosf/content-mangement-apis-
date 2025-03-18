const Section = require('../../models/section-model')

const Course = require('../../models/course-model');

const deleteVideoService = require('../video/deleteVideoService')

const deleteSection = async (sectionId) => {
    try {
        const section = await Section.findByIdAndDelete(sectionId);
        if (!section) {
            return {
                success: false,
                message: "Wrong section id!",
                statusCode: 404
            };
        }
        await Course.findByIdAndUpdate(section.courseId, { $pull: { sections: section._id } });
        await Promise.all(
            section.videos.map(videoId => deleteVideoService(videoId))
        );
        return {
            success: true,
            message: "Section deleted successfully",
            data: section,
            statusCode: 200
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to delete the current section. Please try again",
            statusCode: 500
        };
    }
};
module.exports = deleteSection;