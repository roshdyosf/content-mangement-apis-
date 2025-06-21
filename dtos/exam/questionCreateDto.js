class QuestionCreateDTO {
    constructor({ examId, question, courseId, choices, answerIndex }) {
        this.valid = false
        if (!examId || !courseId || !question || !choices || !answerIndex) {
            return;
        }
        // Validate choices as an array of strings
        if (!Array.isArray(choices) ||
            choices.length !== 4 ||
            !choices.every(choice => typeof choice === 'string')) {
            return;
        }
        if (isNaN(Number(answerIndex))) {
            return;
        }
        this.question = question;
        this.examId = examId;
        this.choices = choices;
        this.answerIndex = Number(answerIndex);
        this.valid = true;
    }
}
module.exports = QuestionCreateDTO