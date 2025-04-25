const express = require('express');
const router = express.Router();
const { createExam, addQuestion, getAllExams, getExamById, deleteExam, updateExam } = require('../controllers/exam-controller');
const authMiddleware = require('../middleware/authMiddleware');
const educatorRoleCheck = require('../middleware/educatorRoleMiddleware');
const { validateId } = require('../middleware/validateRequest');
const educatorIdentityCheck = require('../middleware/educatorIdentityMiddleware');

router.post('/create', authMiddleware, educatorRoleCheck, validateId('educatorId', 'body'), createExam)

router.put('/add-question', authMiddleware, educatorRoleCheck, educatorIdentityCheck, validateId('examId', 'body'), addQuestion)

router.put('/update-exam', authMiddleware, educatorRoleCheck, educatorIdentityCheck, validateId('examId', 'body'), updateExam)

router.get('/get-all-exams/:sectionId', authMiddleware, validateId('sectionId', 'params'), getAllExams)

router.get('/get-exam/:examId', authMiddleware, validateId('examId', 'params'), getExamById)

router.delete('/delete-exam', authMiddleware, educatorRoleCheck, educatorIdentityCheck, validateId('examId', 'body'), deleteExam)

module.exports = router