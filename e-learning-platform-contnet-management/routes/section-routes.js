const express = require('express')
const router = express.Router()
const { getSections,
    createSection,
    updateSectionInfo,
    deleteSection, } = require('../controllers/section-controller')
const educatorRoleCheck = require('../middleware/educatorRoleMiddleware')
const educatorIdentityCheck = require('../middleware/educatorIdentityMiddleware')
const { validateId } = require('../middleware/validateRequest');

const authMiddleware = require('../middleware/authMiddleware')

router.get('/get-all/:courseId', authMiddleware, validateId('courseId', 'params'), getSections)

router.post('/add', authMiddleware, educatorRoleCheck, validateId('courseId', 'body'), createSection)

router.put('/update', authMiddleware, educatorRoleCheck, educatorIdentityCheck, validateId('sectionId', 'body'), updateSectionInfo)

router.delete('/delete/:sectionId', authMiddleware, educatorRoleCheck, educatorIdentityCheck, validateId('sectionId', 'params'), deleteSection)

module.exports = router