const express = require('express');
const router = express.Router();
const { createExam } = require('../controllers/exam-controller');
const authMiddleware = require('../middleware/authMiddleware');
const educatorRoleCheck = require('../middleware/educatorRoleMiddleware');
const { validateId } = require('../middleware/validateRequest');
router.post('/create', authMiddleware, educatorRoleCheck, validateId('educatorId', 'body'), createExam)
module.exports = router