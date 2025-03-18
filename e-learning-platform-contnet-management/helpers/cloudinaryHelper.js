const cloudinary = require('../config/cloudinary')

const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, { resource_type: 'video' })
        return {
            url: result.secure_url,
            publicId: result.public_id
        }
    } catch (error) {
        console.log('error while uploading to cloudinary', error);
        throw new Error('error while uploading to cloudinary')


    }
}
module.exports = { uploadToCloudinary }