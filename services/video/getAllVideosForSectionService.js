const Video = require('../../models/video-model')

const getAllVideosForSectionService = async (sectionId) => {
    try {
        const videos = await Video.find({ sectionId: sectionId }).sort({ order: 1 });
        if (videos.length === 0) {
            return {
                success: false,
                message: 'No video found for this section.',
                data: [],
                statusCode: 404
            };
        }
        return {
            success: true,
            message: 'Videos fetched successfully',
            data: videos,
            statusCode: 200
        };
    } catch (error) {
        console.error('Failed to fetch the videos', error);
        return {
            success: false,
            message: 'Failed to fetch the videos. Please try again.',
            statusCode: 500
        };
    }
};

module.exports = getAllVideosForSectionService
