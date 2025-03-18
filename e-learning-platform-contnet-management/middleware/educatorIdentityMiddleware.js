const Course = require('../models/course-model');

const educatorIdentityCheck = async (req, res, next) => {
    try {

        const educatorId = req.userInfo.userId;

        const courseId = req.body.courseId
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found." });
        }
        if (course.educatorId.toString() !== educatorId) {
            console.log(course.educatorId.toString(), educatorId);

            return res.status(403).json({ success: false, message: "Unauthorized: Educator id mismatch." });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error." });
    }
};

module.exports = educatorIdentityCheck;