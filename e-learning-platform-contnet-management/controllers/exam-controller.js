const createExamService = require('../services/exam/createExamService');
const handleResponse = require('../utils/errorHandler');
const addQuestionService = require("../services/exam/addQuestionService")
const createExam = async (req, res) => {
    const examData = req.body
    const result = await createExamService(examData)
    handleResponse(res, result)
}
const addQuestion = async (req, res) => {
    const questionData = req.body
    const result = await addQuestionService(questionData)
    handleResponse(res, result)
}

module.exports = {
    createExam
    , addQuestion
}