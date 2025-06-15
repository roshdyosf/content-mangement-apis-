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

function uploadMiddleware(type) {
    return multer({
        storage: storage,
        fileFilter: function (req, file, cb) {
            if (file.mimetype.startsWith(type)) {
                cb(null, true)
            } else {
                cb(new Error(`Not a valid ${type} file. Please upload only ${type} files.`))
            }
        }
    });
}

module.exports = uploadMiddleware