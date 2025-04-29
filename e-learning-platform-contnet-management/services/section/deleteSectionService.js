const Section = require('../../models/section-model')

const Course = require('../../models/course-model');

const deleteVideoService = require('../video/deleteVideoService')

const deleteSection = async (sectionId, courseId) => {
    try {
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
        await Section.findByIdAndDelete(sectionId);
        await Course.findByIdAndUpdate(section.courseId, { $pull: { sections: section._id } });
        await Promise.all(
            section.videos.map(videoId => deleteVideoService(videoId, courseId))
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