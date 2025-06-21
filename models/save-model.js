const mongoose = require('mongoose');
const savedCoursesSchema = new mongoose.Schema({
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    studentId: {
        type: String,
        required: true,
    },
    savedDate: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const SavedCourses = mongoose.model('SavedCourses', savedCoursesSchema);
module.exports = SavedCourses;