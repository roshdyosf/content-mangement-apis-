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

// Logging middleware to log service calls
function logService(serviceName) {
  return (req, res, next) => {
    console.log(`Service ${serviceName} invoked: ${req.method} ${req.originalUrl}`);
    next();
  };
}


router.get('/get-all/:sectionId',
    logService("getVideos"),
    validateId('sectionId', "params"), getVideos)

router.get('/get-video/:videoId',
    logService("getSingleVideo"),
    validateId('videoId', "params"), getSingleVideo)

router.post('/add',
    logService("createVideo"),
    requireRole("Educator"), uploadMiddleware('video').single("video"), validateId('sectionId', "body"), validateId('courseId', "body"), createVideo)

router.put('/update',
    logService("updateVideoInfo"),
    requireRole("Educator"), validateId('courseId', "body"), educatorIdentityCheck, validateId('videoId', "body"), updateVideoInfo)

router.delete('/delete/:videoId',
    logService("deleteVideo"),
    requireRole("Educator"), educatorIdentityCheck, validateId('videoId', "params"), deleteVideo)

module.exports = router