const ExamUpdateDTO = require("../../dtos/exam/examUpdateDTO")
const Exam = require("../../models/exam-model")
const examValidation = require("../../validators/examDataValidation")

const updateExamService = async (examUpdatedData, courseId) => {
    try {
        const examUpdateDTO = new ExamUpdateDTO(examUpdatedData)
        const { valid, error, ...dto } = examUpdateDTO
        if (!valid) {
            return {
                success: false,
                message: error || "Invalid exam data.",
                statusCode: 400
            }
        }
        // Validate all provided fields
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
        if (courseId.toString() !== exam.courseId.toString()) {
            return {
                success: false,
                message: 'please don`t hack us.',
                statusCode: 400
            };
        }

        let updated = false;
        if (dto.title !== undefined) {
            exam.title = dto.title;
            updated = true;
        }
        if (dto.question !== undefined && dto.qIndex !== undefined) {
            if (exam.mcq[dto.qIndex]) {
                exam.mcq[dto.qIndex].question = dto.question;
                updated = true;
            } else {
                return {
                    success: false,
                    message: 'Invalid qIndex',
                    statusCode: 400
                };
            }
        }
        if (dto.choice !== undefined && dto.qIndex !== undefined && dto.cIndex !== undefined) {
            if (exam.mcq[dto.qIndex] && exam.mcq[dto.qIndex].choices[dto.cIndex] !== undefined) {
                exam.mcq[dto.qIndex].choices[dto.cIndex] = dto.choice;
                updated = true;
            } else {
                return {
                    success: false,
                    message: 'Invalid qIndex or cIndex',
                    statusCode: 400
                };
            }
        }
        if (dto.answer !== undefined && dto.qIndex !== undefined) {
            if (exam.mcq[dto.qIndex]) {
                exam.mcq[dto.qIndex].answer = dto.answer;
                updated = true;
            } else {
                return {
                    success: false,
                    message: 'Invalid qIndex',
                    statusCode: 400
                };
            }
        }
        if (!updated) {
            return {
                success: false,
                message: 'No valid update fields provided.',
                statusCode: 400
            };
        }
        await exam.save();
        return {
            success: true,
            message: 'Exam updated successfully.',
            statusCode: 200,
            data: exam
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: error.message,
            statusCode: 500
        }
    }
}
module.exports = updateExamService