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
  checkEnrollment
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
    console.log(`Service ${serviceName} invoked: ${req.method} ${req.originalUrl}`);
    next();
  };
}

// Updated route for getting courses for an educator with logging
router.get(
  "/get-for-educator/:educatorId/:limit/:offset",
  validateId("educatorId", "params"),
  logService("getCoursesForEducator"),
  getCoursesForEducator
);

router.get(
  "/get-for-tag/:tag/:limit/:offset",
  logService("getAllCoursesForTag"),
  getAllCoursesForTag
);

router.get(
  "/get-all/:limit/:offset",
  logService("getAllCourses"),
  getAllCourses
);

router.get(
  "/get-course-like/:courseName/:limit/:offset",
  logService("getCoursesLikeName"),
  getCoursesLikeName
);

if (process.env.NODE_ENV === "development") {
  console.log("Development mode: Using mock authentication middleware");
  router.use(mockAuthMiddleware((role = "Educator")));
} else {
  console.log("Production mode: Using real authentication middleware");
  router.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.originalUrl}`);
    next();
  });
  router.use(validateToken);
}

router.get(
  "/get-course/:courseId",
  validateId("courseId", "params"),
  logService("getCoursesById"),
  getCoursesById
);

router.post(
  "/create",
  requireRole("Educator"),
  uploadMiddleware("image").single("image"),
  logService("createCourse"),
  createCourse
);

router.put(
  "/update",
  requireRole("Educator"),
  educatorIdentityCheck,
  validateId("courseId", "body"),
  logService("updateCourseInfo"),
  updateCourseInfo
);

router.put(
  "/notifications",
  validateId("courseId", "body"),
  keyCheck,
  logService("enrollmentCountUpdate"),
  enrollmentCountUpdate
);

router.put(
  "/update-rating",
  validateId("courseId", "body"),
  logService("updateCourseRating"),
  updateCourseRating
);

router.delete(
  "/delete/:courseId",
  requireRole("Educator"),
  educatorIdentityCheck,
  validateId("courseId", "params"),
  logService("deleteCourse"),
  deleteCourse
);


// check student enrollment status
router.get(
  "/enrollment/:courseId",
  validateId("courseId", "params"),
 checkEnrollment
);

router.get(
  "/enrollments/:limit/:offset",
  requireRole("Student"),
  logService("getAllCoursesForStudent"),
  getAllCoursesForStudent
)


module.exports = router;
