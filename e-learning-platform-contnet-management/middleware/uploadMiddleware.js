const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        )
    }
})
const checkFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("video")) {
        cb(null, true)
    } else {
        cb(new Error('not a video, please upload only video files'))
    }
}
const uploadMiddleware = multer({
    storage: storage,
    fileFilter: checkFileFilter
})

module.exports = uploadMiddleware