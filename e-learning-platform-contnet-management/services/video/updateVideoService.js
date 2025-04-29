const Video = require('../../models/video-model')
const videoValidation = require('../../validators/videoDataValidation')
const VideoUpdateDTO = require('../../dtos/video/videoUpdateDTO')

const updateVideoService = async (videoId, videoData, courseId) => {
    const videoUpdateDTO = new VideoUpdateDTO(videoData);
    const { valid, ...dtoWithoutSuccess } = videoUpdateDTO;

    if (!valid) {
        return {
            success: false,
            message: "Invalid video data. At least one field (title, description, order) is required, and order must be a number if provided.",
            statusCode: 400
        };
    }
    try {
        // Extract field names from the DTO
        const fieldsToValidate = Object.keys(dtoWithoutSuccess);

        // Validate the DTO
        const validationResult = videoValidation(dtoWithoutSuccess, fieldsToValidate);

        if (!validationResult.valid) {
            return {
                success: false,
                message: 'Invalid video data.',
                validationResult,
                statusCode: 400
            };
        }

        // Find the video first to check courseId
        const video = await Video.findById(videoId);
        if (!video) {
            return {
                success: false,
                message: 'No video found with this id.',
                statusCode: 404
            };
        }
        if (courseId !== video.courseId) {
            return {
                success: false,
                message: 'please don`t hack us.',
                statusCode: 400
            };
        }
        const updatedVideo = await Video.findByIdAndUpdate(
            videoId,
            { $set: dtoWithoutSuccess },
            { new: true }
        );
        return {
            success: true,
            message: 'Video updated successfully',
            data: updatedVideo,
            statusCode: 200
        };
    } catch (error) {
        console.error('Failed to update the video', error);
        return {
            success: false,
            message: 'Failed to update the video. Please try again.',
            statusCode: 500
        };
    }
};

module.exports = updateVideoService