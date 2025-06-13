const express = require('express')
const router = express.Router()
const { getCoursesForEducator,
    createCourse,
    updateCourseInfo,
    deleteCourse,
    getAllCoursesForTag,
    getAllCourses,
    updateCourseRating,
    getCoursesLikeName } = require('../controllers/course-controller')

const educatorRoleCheck = require('../middleware/educatorRoleMiddleware')
const educatorIdentityCheck = require('../middleware/educatorIdentityMiddleware')
const { } = require('../middleware/authMiddleware')
const { validateId } = require('../middleware/validateRequest');
const keyCheck = require('../middleware/keyCheckMiddleware')

router.get('/get-for-educator/:educatorId/:limit/:offset', authMiddleware, validateId('educatorId', 'params'), getCoursesForEducator)

router.get('/get-for-tag/:tag/:limit/:offset', authMiddleware, getAllCoursesForTag)

router.get('/get-all/:limit/:offset', authMiddleware, getAllCourses)

router.get('/get-course-like/:courseName/:limit/:offset', authMiddleware, getCoursesLikeName)

router.post('/create', authMiddleware, educatorRoleCheck, validateId('educatorId', 'body'), createCourse)

router.put('/update', authMiddleware, educatorRoleCheck, educatorIdentityCheck, validateId('courseId', 'body'), updateCourseInfo)

router.put('/notifications', keyCheck, validateId('courseId', 'body'),)

router.put('/update-rating', authMiddleware, validateId('courseId', 'body'), updateCourseRating)

router.delete('/delete/:courseId', authMiddleware, educatorRoleCheck, educatorIdentityCheck, validateId('courseId', 'params'), deleteCourse)

module.exports = router