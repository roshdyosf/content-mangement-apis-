const authMiddleware = require('../middleware/authMiddleware')

const express = require('express')

const router = express.Router()

const { approveCourse,
    approveSection,
    approveVideo,
    fetchPendingCourses,
    fetchPendingSections,
    fetchPendingVideos, } = require('../controllers/moderator-controller')

const { mockAuthMiddleware, validateToken, requireRole } = require('../middleware/authMiddleware')

const { validateApproval, validateId } = require('../middleware/validateRequest');





if (process.env.NODE_ENV === 'development') {
    // In development mode, use mock authentication middleware
    console.log("Development mode: Using mock authentication middleware")
    router.use(mockAuthMiddleware(role = "Moderator"))
} else {
    // In production mode, use real authentication middleware
    console.log("Production mode: Using real authentication middleware")
    router.use(validateToken)
}


router.put('/approve-course',
    requireRole("Moderator"), validateApproval, validateId('courseId', 'body'), approveCourse)

router.put('/approve-section',
    requireRole("Moderator"), validateApproval, validateId('sectionId', 'body'), approveSection)

router.put('/approve-video',
    requireRole("Moderator"), validateApproval, validateId('videoId', 'body'), approveVideo)


router.get('/get-unapproved-course',
    requireRole("Moderator"), fetchPendingCourses)

router.get('/get-unapproved-section',
    requireRole("Moderator"), fetchPendingSections)

router.get('/get-unapproved-video',
    requireRole("Moderator"), fetchPendingVideos)



module.exports = router