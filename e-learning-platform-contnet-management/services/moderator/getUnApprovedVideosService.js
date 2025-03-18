const Video = require("../../models/video-model");

const getUnApprovedVideosService = async () => {
    try {
        const videos = await Video.find({ approved: false });
        if (videos.length === 0) {
            return {
                success: true,
                message: "No unapproved videos found.",
                data: [],
                statusCode: 404
            };
        }
        return {
            success: true,
            message: "Videos fetched successfully",
            data: videos,
            statusCode: 200
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to fetch videos. Please try again.",
            statusCode: 500
        };
    }
};
module.exports = getUnApprovedVideosService