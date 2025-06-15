const getAllCoursesForEducatorService = require('../services/course/getAllCoursesForEducatorService');
const createCourseService = require('../services/course/createCourseService');
const updateCourseService = require('../services/course/updateCourseService');
const deleteCourseService = require('../services/course/deleteCourseService');
const getAllCoursesService = require('../services/course/getAllCourseService');
const getAllCoursesForTagService = require('../services/course/getCoursesForTagService');
const updateCourseRatingService = require('../services/course/updateCourseRatingService');
const getCoursesLikeNameService = require('../services/course/getCoursesLikeName');
const getCourseByIdService = require('../services/course/getByIdService');
const handleResponse = require('../utils/errorHandler');

const courseEnrollmentCountUpdate = require('../services/course/courseInrollmentService');

const getCoursesForEducator = async (req, res) => {
    const educatorId = req.params.educatorId
    const offset = parseInt(req.params.offset) || 0;
    const limit = parseInt(req.params.limit) || 20;
    const result = await getAllCoursesForEducatorService(educatorId, limit, offset);
    handleResponse(res, result);
};

const getCoursesLikeName = async (req, res) => {
    const courseName = req.params.courseName
    const limit = parseInt(req.params.limit) || 20;
    const result = await getCoursesLikeNameService(courseName, limit)
    handleResponse(res, result);

}
const getCoursesById = async (req, res) => {

    const courseId = req.params.courseId;
    const result = await getCourseByIdService(courseId)
    handleResponse(res, result);

}
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
    const result = await createCourseService(courseData, req.file.path);
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
    const courseId = req.body.data.courseId;
    const action = req.body.data.action;
    const result = await courseEnrollmentCountUpdate(courseId, action);
    handleResponse(res, result);
}
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
    getCoursesById
};
