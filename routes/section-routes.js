const express = require('express')
const router = express.Router()
const { getSections,
    createSection,
    updateSectionInfo,
    deleteSection,
    getSectionById, } = require('../controllers/section-controller')

const educatorIdentityCheck = require('../middleware/educatorIdentityMiddleware')

const { validateId } = require('../middleware/validateRequest');

const { mockAuthMiddleware, validateToken, requireRole } = require('../middleware/authMiddleware')
// Logging middleware to log service calls
function logService(serviceName) {
  return (req, res, next) => {
    console.log(`Service ${serviceName} invoked: ${req.method} ${req.originalUrl}`);
    next();
  };
}

if (process.env.NODE_ENV === 'development') {
    console.log("Development mode: Using mock authentication middleware")
    router.use(mockAuthMiddleware(role = "Educator"))
} else {
    console.log("Production mode: Using real authentication middleware")
    router.use(validateToken)
}


router.get('/get-all/:courseId',
    logService("getSections"),
    validateId('courseId', 'params'), getSections)

router.get('/get-section/:sectionId',
    logService("getSectionById"),
    validateId('sectionId', 'params'), getSectionById)

router.post('/add',
    logService("createSection"),
    requireRole("Educator"), validateId('courseId', 'body'), createSection)

router.put('/update',
    logService("updateSectionInfo"),
    requireRole("Educator"), educatorIdentityCheck, validateId('sectionId', 'body'), updateSectionInfo)

router.delete('/delete/:sectionId',
    logService("deleteSection"),
    requireRole("Educator"), educatorIdentityCheck, validateId('sectionId', 'params'), deleteSection)

module.exports = router