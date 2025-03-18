const Video = require('../../models/video-model')

const videoApprovalService = async (videoId, approved) => {
    try {
        const updatedVideo = await Video.findByIdAndUpdate(
            videoId,
            { approved: approved },
            { new: true }
        );
        if (!updatedVideo) {
            return {
                success: false,
                message: "No video found with this id.",
                statusCode: 404
            };
        }
        return {
            success: true,
            message: "Video approval updated successfully.",
            data: updatedVideo,
            statusCode: 200
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to update video approval. Please try again.",
            statusCode: 500
        };
    }
};


module.exports = videoApprovalService