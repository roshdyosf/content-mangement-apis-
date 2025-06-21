const ExamUpdateDTO = require("../../dtos/exam/examUpdateDTO")
const Exam = require("../../models/exam-model")

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
        if (Array.isArray(dto.questions) && dto.questions.length > 0) {
            for (const q of dto.questions) {
                const idx = q.qIndex;
                if (exam.mcq[idx]) {
                    if (q.question !== undefined) {
                        exam.mcq[idx].question = q.question;
                        updated = true;
                    }
                    if (q.choices !== undefined) {
                        exam.mcq[idx].choices = q.choices;
                        updated = true;
                    }
                    if (q.answerIndex !== undefined) {
                        exam.mcq[idx].answerIndex = q.answerIndex;
                        updated = true;
                    }
                } else {
                    return {
                        success: false,
                        message: `Invalid qIndex: ${idx}`,
                        statusCode: 400
                    };
                }
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