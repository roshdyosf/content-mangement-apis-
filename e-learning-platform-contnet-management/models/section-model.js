const mongoose = require("mongoose");
const sectionSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
        max: 20
    },

    description: {
        type: String,
        required: true,
        trim: true,
    },

    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },

    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }],

    order: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    exams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam'
    }],
    approved: {
        type: Boolean,
        default: false,
    }

}, { timestamps: true });
const Section = mongoose.model('Section', sectionSchema);
module.exports = Section
