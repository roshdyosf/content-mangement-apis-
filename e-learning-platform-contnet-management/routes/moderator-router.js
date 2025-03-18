const authMiddleware = require('../middleware/authMiddleware')
const moderatorMiddleware = require('../middleware/moderatorRoleMiddleware')
const express = require('express')
const { approveCourse,
    approveSection,
    approveVideo,
    fetchPendingCourses,
    fetchPendingSections,
    fetchPendingVideos, } = require('../controllers/moderator-controller')

const { validateApproval, validateId } = require('../middleware/validateRequest');


const router = express.Router()

router.put('/approve-course',
    authMiddleware, moderatorMiddleware, validateApproval, validateId('courseId', 'body'), approveCourse)

router.put('/approve-section',
    authMiddleware, moderatorMiddleware, validateApproval, validateId('sectionId', 'body'), approveSection)

router.put('/approve-video',
    authMiddleware, moderatorMiddleware, validateApproval, validateId('videoId', 'body'), approveVideo)


router.get('/get-unapproved-course',
    authMiddleware, moderatorMiddleware, fetchPendingCourses)

router.get('/get-unapproved-section',
    authMiddleware, moderatorMiddleware, fetchPendingSections)

router.get('/get-unapproved-video',
    authMiddleware, moderatorMiddleware, fetchPendingVideos)



module.exports = router