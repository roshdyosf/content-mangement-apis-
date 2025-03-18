const express = require('express')
const router = express.Router()
const { getCoursesForEducator,
    createCourse,
    updateCourseInfo,
    deleteCourse,
    getAllCoursesForTag,
    getAllCourses,
    updateCourseRating } = require('../controllers/course-controller')

const educatorRoleCheck = require('../middleware/educatorRoleMiddleware')
const educatorIdentityCheck = require('../middleware/educatorIdentityMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const { validateId } = require('../middleware/validateRequest');

router.get('/get-for-educator/:educatorId', authMiddleware, validateId('educatorId', 'params'), getCoursesForEducator)

router.get('/get-for-tag/:tag', authMiddleware, getAllCoursesForTag)

router.get('/get-all/:limit/:offset', authMiddleware, getAllCourses)

router.post('/create', authMiddleware, educatorRoleCheck, validateId('educatorId', 'body'), createCourse)

router.put('/update/', authMiddleware, educatorRoleCheck, educatorIdentityCheck, validateId('courseId', 'body'), updateCourseInfo)

router.put('/update-rating/', authMiddleware, validateId('courseId', 'body'), updateCourseRating)

router.delete('/delete/:courseId', authMiddleware, educatorRoleCheck, educatorIdentityCheck, validateId('courseId', 'params'), deleteCourse)

module.exports = router