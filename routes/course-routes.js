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

router.get(
  "/get-for-educator/:educatorId/:limit/:offset",
  validateId("educatorId", "params"),
  getCoursesForEducator
);

router.get("/get-for-tag/:tag/:limit/:offset", getAllCoursesForTag);

router.get("/get-all/:limit/:offset", getAllCourses);

router.get("/get-course-like/:courseName/:limit/:offset", getCoursesLikeName);

if (process.env.NODE_ENV === "development") {
  console.log("Development mode: Using mock authentication middleware");
  router.use(mockAuthMiddleware((role = "Educator")));
} else {
  console.log("Production mode: Using real authentication middleware");
  console.log(`Request received: ${req.method} ${req.originalUrl}`);
  router.use(validateToken);
}

router.get(
  "/get-course/:courseId",
  validateId("courseId", "params"),
  getCoursesById
);

router.post(
  "/create",
  requireRole("Educator"),
  uploadMiddleware("image").single("image"),
  validateId("educatorId", "body"),
  createCourse
);

router.put(
  "/update",
  requireRole("Educator"),
  educatorIdentityCheck,
  validateId("courseId", "body"),
  updateCourseInfo
);

router.put(
  "/notifications",
  validateId("courseId", "body"),
  keyCheck,
  enrollmentCountUpdate
);

router.put(
  "/update-rating",
  validateId("courseId", "body"),
  updateCourseRating
);

router.delete(
  "/delete/:courseId",
  requireRole("Educator"),
  educatorIdentityCheck,
  validateId("courseId", "params"),
  deleteCourse
);

module.exports = router;
