const express = require('express');
const router = express.Router();
const { createExam, addQuestion } = require('../controllers/exam-controller');
const authMiddleware = require('../middleware/authMiddleware');
const educatorRoleCheck = require('../middleware/educatorRoleMiddleware');
const { validateId } = require('../middleware/validateRequest');
const educatorIdentityCheck = require('../middleware/educatorIdentityMiddleware');
router.post('/create', authMiddleware, educatorRoleCheck, validateId('educatorId', 'body'), createExam)
router.put('/add-question', authMiddleware, educatorRoleCheck, educatorIdentityCheck, validateId('examId', 'body'), addQuestion)
module.exports = router