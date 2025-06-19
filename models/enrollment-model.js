const mongoose = require('mongoose');
const enrollmentSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    studentId: {
        type: String,
        required: true,
    },
    enrollmentDate: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
module.exports = Enrollment;