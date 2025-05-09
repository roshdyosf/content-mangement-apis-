const fs = require('fs');
const Video = require('../../models/video-model');
const Section = require('../../models/section-model');
const videoValidation = require('../../validators/videoDataValidation');
const { uploadToCloudinary } = require('../../helpers/cloudinaryHelper');
const VideoCreateDTO = require('../../dtos/video/videoCreateDTO')

const createVideoService = async (videoData, filePath) => {
    try {

        if (!filePath) {
            return {
                success: false,
                message: "No video file uploaded.",
                statusCode: 400
            };
        }

        const videoCreateDTO = new VideoCreateDTO(videoData);

        const { valid, ...dtoWithoutSuccess } = videoCreateDTO;

        if (!valid) {
            return {
                success: false,
                message: "Invalid video data. Title, description, sectionId, and courseId are required, and order must be a number.",
                statusCode: 400
            };
        }

        const fieldsToValidate = Object.keys(dtoWithoutSuccess);
        const validationResult = videoValidation(dtoWithoutSuccess, fieldsToValidate);

        if (!validationResult.valid) {
            console.log(validationResult);

            return {
                success: false,
                message: 'Invalid video data.',
                validationResult,
                statusCode: 400
            };
        }

        // Upload the video file to Cloudinary.
        const result = await uploadToCloudinary(filePath);

        // Create a new Video document with the Cloudinary result.
        const newVideo = new Video({
            ...videoData,
            url: result.url,
            publicId: result.publicId
        });

        const savedVideo = await newVideo.save();
        await Section.findByIdAndUpdate(dtoWithoutSuccess.sectionId, { $push: { videos: savedVideo._id } });

        return {
            success: true,
            message: "Video created successfully.",
            data: savedVideo,
            statusCode: 201
        };
    } catch (error) {
        console.error("Error creating video:", error);
        return {
            success: false,
            message: "Error creating video. Please try again.",
            error: error.message,
            statusCode: 500
        };
    } finally {
        // Always delete the local file
        try {
            await fs.promises.unlink(filePath);
        } catch (err) {
            console.error('Error deleting local file:', err);
        }
    }
};
module.exports = createVideoService