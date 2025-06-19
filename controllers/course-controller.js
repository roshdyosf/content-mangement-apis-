const getAllCoursesForEducatorService = require("../services/course/getAllCoursesForEducatorService");
const createCourseService = require("../services/course/createCourseService");
const updateCourseService = require("../services/course/updateCourseService");
const deleteCourseService = require("../services/course/deleteCourseService");
const getAllCoursesService = require("../services/course/getAllCourseService");
const getAllCoursesForTagService = require("../services/course/getCoursesForTagService");
const updateCourseRatingService = require("../services/course/updateCourseRatingService");
const getCoursesLikeNameService = require("../services/course/getCoursesLikeName");
const getCourseByIdService = require("../services/course/getByIdService");
const handleResponse = require("../utils/errorHandler");

const courseEnrollmentCountUpdate = require("../services/course/courseInrollmentService");

const getCoursesForEducator = async (req, res) => {
  const educatorId = req.params.educatorId;
  const offset = parseInt(req.params.offset) || 0;
  const limit = parseInt(req.params.limit) || 20;
  const result = await getAllCoursesForEducatorService(
    educatorId,
    limit,
    offset
  );
  handleResponse(res, result);
};

const getCoursesLikeName = async (req, res) => {
  const courseName = req.params.courseName;
  const limit = parseInt(req.params.limit) || 20;
  const result = await getCoursesLikeNameService(courseName, limit);
  handleResponse(res, result);
};
const getCoursesById = async (req, res) => {
  const courseId = req.params.courseId;
  const result = await getCourseByIdService(courseId);
  handleResponse(res, result);
};
const getAllCoursesForTag = async (req, res) => {
  const tag = req.params.tag;
  const limit = parseInt(req.params.limit) || 20;
  const offset = parseInt(req.params.offset) || 0;
  const result = await getAllCoursesForTagService(tag, limit, offset);
  handleResponse(res, result);
};

const getAllCourses = async (req, res) => {
  const limit = parseInt(req.params.limit) || 20;
  const offset = parseInt(req.params.offset) || 0;
  const result = await getAllCoursesService(limit, offset);
  handleResponse(res, result);
};

const createCourse = async (req, res) => {
  const courseData = req.body;
  const educatorId = req.userInfo.userId || req.userInfo.id;
  const userName = req.userInfo.firstName + " " + req.userInfo.lastName;
  const result = await createCourseService(
    courseData,
    educatorId,
    userName,
    req.file.path
  );
  handleResponse(res, result);
};

const updateCourseInfo = async (req, res) => {
  const courseId = req.body.courseId;
  const courseData = req.body;
  const result = await updateCourseService(courseId, courseData);
  handleResponse(res, result);
};

const deleteCourse = async (req, res) => {
  const courseId = req.params.courseId;
  const result = await deleteCourseService(courseId);
  handleResponse(res, result);
};

const updateCourseRating = async (req, res) => {
  const courseId = req.body.courseId;
  const newRating = req.body.rating;
  const result = await updateCourseRatingService(courseId, newRating);
  handleResponse(res, result);
};

const enrollmentCountUpdate = async (req, res) => {
  console.log(req.body.courseId);
  const courseId = req.body.courseId;
  const action = req.body.action;
  const result = await courseEnrollmentCountUpdate(courseId, action);
  handleResponse(res, result);
};

const {
  getAllCoursesForStudentService,
} = require("../services/course/getAllCoursesForStudent");
const {
  checkEnrollmentService,
} = require("../services/course/CheckEnrollment");

/**
 * @swagger
 * /courses/enrollments/{limit}/{offset}:
 *   get:
 *     summary: Retrieve courses for a student
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication.
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: limit
 *         required: false
 *         description: Number of courses to retrieve.
 *         schema:
 *           type: integer
 *           default: 6
 *       - in: path
 *         name: offset
 *         required: false
 *         description: Offset for pagination.
 *         schema:
 *           type: integer
 *           default: 0
 *     responses:
 *       200:
 *         description: A list of courses for the student.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 */

/**
 * @swagger
 * /courses/enrollment/{courseId}:
 *   get:
 *     summary: Check if a student is enrolled in a course
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication.
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: The ID of the course to check enrollment for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enrollment status of the student in the course.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 enrolled:
 *                   type: boolean
 */
const getAllCoursesForStudent = async (req, res) => {
  const userId = req.userInfo.userId || req.userInfo.id;
  const limit = parseInt(req.params.limit) || 6;
  const offset = parseInt(req.params.offset) || 0;
  const result = await getAllCoursesForStudentService(userId, limit, offset);
  handleResponse(res, result);
};

const checkEnrollment = async (req, res) => {
  const courseId = req.params.courseId;
  const userId = req.userInfo.userId || req.userInfo.id;
  const result = await checkEnrollmentService(userId, courseId);
  handleResponse(res, result);
};



module.exports = {
  getCoursesForEducator,
  createCourse,
  updateCourseInfo,
  deleteCourse,
  getAllCourses,
  getAllCoursesForTag,
  updateCourseRating,
  getCoursesLikeName,
  enrollmentCountUpdate,
  getCoursesById,
  getAllCoursesForStudent,
  checkEnrollment,
};
