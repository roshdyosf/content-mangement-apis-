const mongoose = require('mongoose');

const mcqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true,
    },
    choices: [{
        type: String,
        required: true,
        trim: true,
    }],
    answerIndex: {
        type: String,
        required: true,
        trim: true,
    }
});

const examSchema = new mongoose.Schema({
    educatorId: {
        type: String,
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    mcq: [mcqSchema],
}, { timestamps: true });
const Exam = mongoose.model('Exam', examSchema)
module.exports = Exam