const Enrollment = require("../../models/enrollment-model");

const checkEnrollmentService = async (userId, courseId) => {
  try {
    // Check if the user is enrolled in the course
    const enrollment = await Enrollment.findOne({
      studentId: userId,
      courseId: courseId,
    });

    if (!enrollment) {
      return {
        success: false,
        message: "User is not enrolled in this course",
        statusCode: 403,
      };
    }

    return {
      success: true,
      message: "User is enrolled in this course",
      statusCode: 200,
      data: {
        courseId: enrollment.courseId,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Internal server error",
      statusCode: 500,
    };
  }
};

module.exports = {
  checkEnrollmentService,
};