const Section = require('../../models/section-model')
const Video = require('../../models/video-model');

const deleteVideo = async (videoId, courseId) => {
    try {
        const video = await Video.findById(videoId);
        if (!video) {
            return {
                success: false,
                message: "Wrong video id!",
                statusCode: 404
            };
        }
        if (courseId.toString() !== video.courseId.toString()) {
            return {
                success: false,
                message: 'please don`t hack us.',
                statusCode: 400
            };
        }
        await Video.findByIdAndDelete(videoId);
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