const express = require('express')

const educatorRoleCheck = require('../middleware/educatorRoleMiddleware')
const educatorIdentityCheck = require('../middleware/educatorIdentityMiddleware')
const uploadMiddleware = require('../middleware/uploadMiddleware')
const { validateId } = require('../middleware/validateRequest');
const authMiddleware = require('../middleware/authMiddleware')

const { getVideos,
    createVideo,
    updateVideoInfo,
    deleteVideo, getSingleVideo } = require('../controllers/video-controller')

const router = express.Router()

router.get('/get-all/:sectionId', authMiddleware, validateId('sectionId', "params"), getVideos)

router.get('/get-video/:videoId', authMiddleware, validateId('videoId', "params"), getSingleVideo)

router.post('/add', authMiddleware, educatorRoleCheck, uploadMiddleware.single("video"), validateId('sectionId', "body"), validateId('courseId', "body"), createVideo)

router.put('/update', authMiddleware, educatorRoleCheck, validateId('courseId', "body"), educatorIdentityCheck, validateId('videoId', "body"), updateVideoInfo)

router.delete('/delete/:videoId', authMiddleware, educatorRoleCheck, educatorIdentityCheck, validateId('videoId', "params"), deleteVideo)

module.exports = router