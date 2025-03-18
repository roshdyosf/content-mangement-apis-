const Video = require('../../models/video-model')
const getSingleVideoService = async (videoId) => {
    try {
        const video = await Video.findById(videoId);
        if (!video) {
            return {
                success: false,
                message: 'No video found with this id.',
                statusCode: 404
            };
        }
        return {
            success: true,
            message: 'Video fetched successfully',
            data: video,
            statusCode: 200
        };
    } catch (error) {
        console.error('Failed to fetch the video', error);
        return {
            success: false,
            message: 'Failed to fetch the video. Please try again.',
            statusCode: 500
        };
    }
};
module.exports = getSingleVideoService