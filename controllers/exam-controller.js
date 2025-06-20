const createExamService = require('../services/exam/createExamService');
const handleResponse = require('../utils/errorHandler');
const addQuestionService = require("../services/exam/addQuestionService");
const getExamService = require('../services/exam/getExamService');
const getExamByIdService = require('../services/exam/getExamById');
const deleteExamService = require('../services/exam/deleteExamService');
const updateExamService = require('../services/exam/updateExamService');


const createExam = async (req, res) => {
    const examData = req.body
    const educatorId = req.userInfo.userId || req.userInfo.id;
    const result = await createExamService(examData, educatorId)
    handleResponse(res, result)
}
const addQuestion = async (req, res) => {
    const questionData = req.body
    const result = await addQuestionService(questionData)
    handleResponse(res, result)
}
const getAllExams = async (req, res) => {
    const sectionId = req.params.sectionId;
    const result = await getExamService(sectionId);
    handleResponse(res, result);
};
const getExamById = async (req, res) => {
    const examId = req.params.examId;
    const result = await getExamByIdService(examId);
    handleResponse(res, result);
};

const updateExam = async (req, res) => {
    const examData = req.body
    const courseId = req.body.courseId;
    const result = await updateExamService(examData, courseId)
    handleResponse(res, result)
}
const deleteExam = async (req, res) => {
    const examId = req.params.examId;
    const courseId = req.body.courseId;
    const result = await deleteExamService(examId, courseId);
    handleResponse(res, result);
};
module.exports = {
    createExam,
    addQuestion,
    getAllExams,
    getExamById,
    updateExam,
    deleteExam,
}