const express = require('express')

const router = express.Router()

const educatorIdentityCheck = require('../middleware/educatorIdentityMiddleware')

const uploadMiddleware = require('../middleware/uploadMiddleware')

const { validateId } = require('../middleware/validateRequest');

const { mockAuthMiddleware, validateToken, requireRole } = require('../middleware/authMiddleware')

const { getVideos,
    createVideo,
    updateVideoInfo,
    deleteVideo, getSingleVideo } = require('../controllers/video-controller')


if (process.env.NODE_ENV === 'development') {
    console.log("Development mode: Using mock authentication middleware")
    router.use(mockAuthMiddleware(role = "Educator"))
} else {
    console.log("Production mode: Using real authentication middleware")
    router.use(validateToken)
}




router.get('/get-all/:sectionId',
    validateId('sectionId', "params"), getVideos)

router.get('/get-video/:videoId',
    validateId('videoId', "params"), getSingleVideo)

router.post('/add',
    requireRole("Educator"), uploadMiddleware.single("video"), validateId('sectionId', "body"), validateId('courseId', "body"), createVideo)

router.put('/update',
    requireRole("Educator"), validateId('courseId', "body"), educatorIdentityCheck, validateId('videoId', "body"), updateVideoInfo)

router.delete('/delete/:videoId',
    requireRole("Educator"), educatorIdentityCheck, validateId('videoId', "params"), deleteVideo)

module.exports = router