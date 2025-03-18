const Section = require('../../models/section-model')
const Video = require('../../models/video-model');

const deleteVideo = async (videoId) => {
    try {
        const video = await Video.findByIdAndDelete(videoId);
        if (!video) {
            return {
                success: false,
                message: "Wrong video id!",
                statusCode: 404
            };
        }
        await Section.findByIdAndUpdate(video.sectionId, { $pull: { videos: video._id } });
        return {
            success: true,
            message: "Video deleted successfully",
            data: video,
            statusCode: 200
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to delete the current video. Please try again",
            statusCode: 500
        };
    }
};

module.exports = deleteVideo;