const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({

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

    educator: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },

    educatorId: {
        type: String,
        required: true,
        trim: true,
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true
    },

    imagePublicId: {
        type: String,
        required: true,
        trim: true
    },
    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }],

    tags: [{ type: String }],
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 1000
    }
    ,
    enrollmentCount: {
        type: Number,
        default: 0
    }
    ,
    approved: {
        type: Boolean,
        default: false,
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    },
    rating: {
        average: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        count: {
            type: Number,
            default: 0
        }
    }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema)
module.exports = Course