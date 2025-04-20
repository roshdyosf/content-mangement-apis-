const createExamService = require('../services/exam/createExamService');
const handleResponse = require('../utils/errorHandler');

const createExam = async (req, res) => {
    const examData = req.body
    const result = await createExamService(examData)
    handleResponse(res, result)
}

module.exports = { createExam }