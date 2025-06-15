const fs = require('fs');
const Video = require('../../models/video-model');
const Section = require('../../models/section-model');
const Course = require('../../models/course-model');
const videoValidation = require('../../validators/videoDataValidation');
const { uploadToCloudinary } = require('../../helpers/cloudinaryHelper');
const VideoCreateDTO = require('../../dtos/video/videoCreateDTO')

const createVideoService = async (videoData, educatorId, filePath) => {
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

        // Fetch section with its courseId populated, and check _id in query
        const section = await Section.findOne({
            _id: dtoWithoutSuccess.sectionId,
            courseId: dtoWithoutSuccess.courseId
        }).populate('courseId').lean();
        if (!section) {
            return {
                success: false,
                message: 'Section not found or does not belong to the specified course. Cannot create video.',
                statusCode: 404
            };
        }
        // Check if educator matches
        if (section.courseId.educatorId.toString() !== educatorId.toString()) {
            return {
                success: false,
                message: 'Educator does not match the course educator.',
                statusCode: 403
            };
        }

        // Upload the video file to Cloudinary.
        const result = await uploadToCloudinary(filePath, 'video');

        // Create a new Video document with the Cloudinary result.
        const newVideo = new Video({
            ...dtoWithoutSuccess,
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