const ExamUpdateDTO = require("../../dtos/exam/examUpdateDTO")
const Exam = require("../../models/exam-model")
const examValidation = require("../../validators/examDataValidation")

const updateExamService = async (examUpdatedData) => {
    try {
        const examUpdateDTO = new ExamUpdateDTO(examUpdatedData)
        const { valid, ...dto } = examUpdateDTO
        if (!valid) {
            return {
                success: false,
                message: "Invalid exam data.",
                statusCode: 400
            }
        }

        const fieldsToValidate = Object.keys(dto);
        const validationResult = examValidation(dto, fieldsToValidate);

        if (!validationResult.valid) {
            return {
                success: false,
                message: validationResult,
                statusCode: 400
            };
        }

        const exam = await Exam.findById(dto.examId);
        if (!exam) throw new Error("Exam not found");

        switch (dto.option) {
            case "question":
                if (!exam.mcq[dto.questionIndex]) throw new Error("Question index out of range");
                exam.mcq[dto.questionIndex].question = dto.question;
                break;

            case "choice":
                if (!exam.mcq[dto.questionIndex]) throw new Error("Question index out of range");
                if (!exam.mcq[dto.questionIndex].choices[dto.choiceIndex]) throw new Error("Choice index out of range");
                exam.mcq[dto.questionIndex].choices[dto.choiceIndex] = dto.choice;
                break;

            case "answer":
                if (!exam.mcq[dto.questionIndex]) throw new Error("Question index out of range");
                exam.mcq[dto.questionIndex].answer = dto.answer;
                break;

            case "title":
                exam.title = dto.title;
                break;

            default:
                throw new Error("Unknown update option");
        }
        await exam.save();

        return {
            success: true,
            message: "exams updated successfully.",
            data: exam,
            statusCode: 200
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: error.message, // Return only the error message
            statusCode: 500
        }
    }
}
module.exports = updateExamService