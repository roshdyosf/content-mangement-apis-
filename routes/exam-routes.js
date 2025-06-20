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
    // #swagger.tags = ['Exams']
    logService("createExam"),
    requireRole("Educator"), createExam)

router.put('/add-question',
    // #swagger.tags = ['Exams']
    logService("addQuestion"),
    requireRole("Educator"), educatorIdentityCheck, validateId('examId', 'body'), addQuestion)

router.put('/update',
    // #swagger.tags = ['Exams']
    requireRole("Educator"), educatorIdentityCheck, validateId('examId', 'body'), updateExam)

router.get('/get-all-exams/:sectionId',
    // #swagger.tags = ['Exams']
    logService("getAllExams"),
    validateId('sectionId', 'params'), getAllExams)

router.get('/get-exam/:examId',
    // #swagger.tags = ['Exams']
    logService("getExamById"),
    validateId('examId', 'params'), getExamById)

router.delete('/delete/:examId',
    // #swagger.tags = ['Exams']
    logService("deleteExam"),
    requireRole("Educator"), educatorIdentityCheck, validateId('examId', 'params'), deleteExam)

module.exports = router