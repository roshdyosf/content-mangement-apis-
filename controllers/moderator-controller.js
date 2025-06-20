// const getUnApprovedCoursesService = require("../services/moderator/getUnApprovedCoursesService");
// const getUnApprovedSectionsService = require("../services/moderator/getUnApprovedSectionsService");
// const getUnApprovedVideosService = require("../services/moderator/getUnApprovedVideosService");

// const courseApprovalService = require("../services/moderator/courseApprovalService");
// const sectionApprovalService = require("../services/moderator/sectionApprovalService");
// const videoApprovalService = require("../services/moderator/videoApprovalService");

// const handleResponse = require("../utils/errorHandler");

// const fetchPendingCourses = async (req, res) => {
//     const result = await getUnApprovedCoursesService();
//     handleResponse(res, result);
// };

// const fetchPendingSections = async (req, res) => {
//     const result = await getUnApprovedSectionsService();
//     handleResponse(res, result);
// };

// const fetchPendingVideos = async (req, res) => {
//     const result = await getUnApprovedVideosService();
//     handleResponse(res, result);
// };

// const approveCourse = async (req, res) => {
//     const { courseId, approval } = req.body;
//     const result = await courseApprovalService(courseId, approval);
//     handleResponse(res, result);
// };

// const approveSection = async (req, res) => {
//     const { sectionId, approval } = req.body;
//     const result = await sectionApprovalService(sectionId, approval);
//     handleResponse(res, result);
// };

// const approveVideo = async (req, res) => {
//     const { videoId, approval } = req.body;
//     const result = await videoApprovalService(videoId, approval);
//     handleResponse(res, result);
// };

// module.exports = {
//     approveCourse,
//     approveSection,
//     approveVideo,
//     fetchPendingCourses,
//     fetchPendingSections,
//     fetchPendingVideos,
// };
