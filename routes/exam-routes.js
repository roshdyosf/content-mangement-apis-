const express = require('express');

const router = express.Router();

const { createExam, addQuestion, getAllExams, getExamById, deleteExam, updateExam } = require('../controllers/exam-controller');

const { mockAuthMiddleware, validateToken, requireRole } = require('../middleware/authMiddleware')

const { validateId } = require('../middleware/validateRequest');

const educatorIdentityCheck = require('../middleware/educatorIdentityMiddleware');

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




router.post('/create',
    logService("createExam"),
    requireRole("Educator"), validateId('educatorId', 'body'), createExam)

router.put('/add-question',
    logService("addQuestion"),
    requireRole("Educator"), educatorIdentityCheck, validateId('examId', 'body'), addQuestion)

router.put('/update-exam',
    requireRole("Educator"), educatorIdentityCheck, validateId('examId', 'body'), updateExam)

router.get('/get-all-exams/:sectionId', 
    logService("getAllExams"),
    validateId('sectionId', 'params'), getAllExams)

router.get('/get-exam/:examId',
    logService("getExamById"),
    validateId('examId', 'params'), getExamById)

router.delete('/delete-exam',
    logService("deleteExam"),
    requireRole("Educator"), educatorIdentityCheck, validateId('examId', 'body'), deleteExam)

module.exports = router