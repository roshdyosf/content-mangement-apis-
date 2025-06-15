const mongoose = require("mongoose");
const videoSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
        max: 20
    },

    url: {
        type: String,
        required: true,
        trim: true
    },

    publicId: {
        type: String,
        required: true,
        trim: true
    },

    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },

    sectionId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Section',
        required: true,
    },

    order: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },

    approved: {
        type: Boolean,
        default: false,
    }

}, { timestamps: true });
const Video = mongoose.model('Video', videoSchema);
module.exports = Video
