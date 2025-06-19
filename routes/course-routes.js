const express = require("express");

const router = express.Router();

const {
  getCoursesForEducator,
  createCourse,
  updateCourseInfo,
  deleteCourse,
  getAllCoursesForTag,
  getAllCourses,
  updateCourseRating,
  getCoursesLikeName,
  enrollmentCountUpdate,
  getCoursesById,
  getAllCoursesForStudent,
  checkEnrollment,
} = require("../controllers/course-controller");

const educatorIdentityCheck = require("../middleware/educatorIdentityMiddleware");

const {
  mockAuthMiddleware,
  validateToken,
  requireRole,
} = require("../middleware/authMiddleware");

const uploadMiddleware = require("../middleware/uploadMiddleware");

const { validateId } = require("../middleware/validateRequest");

const keyCheck = require("../middleware/keyCheckMiddleware");

// Logging middleware to log service calls
function logService(serviceName) {
  return (req, res, next) => {
    console.log(
      `Service ${serviceName} invoked: ${req.method} ${req.originalUrl}`
    );
    next();
  };
}

// Updated route for getting courses for an educator with logging
// #swagger.security = [{ "BearerAuth": [] }]
router.get(
  "/get-for-educator/:educatorId/:limit/:offset",
  // #swagger.tags = ['Courses']
  validateId("educatorId", "params"),
  logService("getCoursesForEducator"),
  getCoursesForEducator
);

// #swagger.security = [{ "BearerAuth": [] }]
router.get(
  "/get-for-tag/:tag/:limit/:offset",
  // #swagger.tags = ['Courses']
  logService("getAllCoursesForTag"),
  getAllCoursesForTag
);

// #swagger.security = [{ "BearerAuth": [] }]
router.get(
  "/get-all/:limit/:offset",
  // #swagger.tags = ['Courses']
  logService("getAllCourses"),
  getAllCourses
);

// #swagger.security = [{ "BearerAuth": [] }]
router.get(
  "/get-course-like/:courseName/:limit/:offset",
  // #swagger.tags = ['Courses']
  logService("getCoursesLikeName"),
  getCoursesLikeName
);

// #swagger.security = [{ "BearerAuth": [] }]
router.get(
  "/get-course/:courseId",
  // #swagger.tags = ['Courses']
  validateId("courseId", "params"),
  logService("getCoursesById"),
  getCoursesById
);

if (process.env.NODE_ENV === "development") {
  console.log("Development mode: Using mock authentication middleware");
  // #swagger.security = [{ "BearerAuth": [] }]
  router.use(mockAuthMiddleware((role = "Educator")));
} else {
  console.log("Production mode: Using real authentication middleware");
  // #swagger.security = [{ "BearerAuth": [] }]
  router.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.originalUrl}`);
    next();
  });
  // #swagger.security = [{ "BearerAuth": [] }]
  router.use(validateToken);
}

// #swagger.security = [{ "BearerAuth": [] }]
router.post(
  "/create",
  // #swagger.tags = ['Courses']
  requireRole("Educator"),
  uploadMiddleware("image").single("image"),
  logService("createCourse"),
  createCourse
);

// #swagger.security = [{ "BearerAuth": [] }]
// #swagger.security = [{ "BearerAuth": [] }]
router.put(
  "/update",
  // #swagger.tags = ['Courses']
  requireRole("Educator"),
  educatorIdentityCheck,
  validateId("courseId", "body"),
  logService("updateCourseInfo"),
  updateCourseInfo
);

// #swagger.security = [{ "BearerAuth": [] }]
router.put(
  "/notifications",
  // #swagger.tags = ['Courses']
  validateId("courseId", "body"),
  keyCheck,
  logService("enrollmentCountUpdate"),
  enrollmentCountUpdate
);

// #swagger.security = [{ "BearerAuth": [] }]
router.put(
  "/update-rating",
  // #swagger.tags = ['Courses']
  validateId("courseId", "body"),
  logService("updateCourseRating"),
  updateCourseRating
);

// #swagger.security = [{ "BearerAuth": [] }]
router.delete(
  "/delete/:courseId",
  // #swagger.tags = ['Courses']
  requireRole("Educator"),
  educatorIdentityCheck,
  validateId("courseId", "params"),
  logService("deleteCourse"),
  deleteCourse
);

// check student enrollment status
// #swagger.security = [{ "BearerAuth": [] }]
router.get(
  "/enrollment/:courseId",
  // #swagger.tags = ['Student']
  validateId("courseId", "params"),
  checkEnrollment
);

// #swagger.security = [{ "BearerAuth": [] }]
router.get(
  "/enrollments/:limit/:offset",
  // #swagger.tags = ['Student']
  requireRole("Student"),
  logService("getAllCoursesForStudent"),
  getAllCoursesForStudent
);

module.exports = router;
