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


if (process.env.NODE_ENV === 'development') {
    console.log("Development mode: Using mock authentication middleware")
    router.use(mockAuthMiddleware(role = "Educator"))
} else {
    console.log("Production mode: Using real authentication middleware")
    router.use(validateToken)
}


router.get('/get-all/:courseId',
    validateId('courseId', 'params'), getSections)

router.get('/get-section/:sectionId',
    validateId('sectionId', 'params'), getSectionById)

router.post('/add',
    requireRole("Educator"), validateId('courseId', 'body'), createSection)

router.put('/update',
    requireRole("Educator"), educatorIdentityCheck, validateId('sectionId', 'body'), updateSectionInfo)

router.delete('/delete/:sectionId',
    requireRole("Educator"), educatorIdentityCheck, validateId('sectionId', 'params'), deleteSection)

module.exports = router