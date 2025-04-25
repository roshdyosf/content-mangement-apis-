class QuestionCreateDTO {
    constructor({ examId, question, courseId, choices, answer }) {
        this.valid = false
        if (!examId || !courseId || !question || !choices || !answer) {
            return;
        }
        // Validate choices as an array of strings
        if (!Array.isArray(choices) ||
            choices.length !== 4 ||
            !choices.every(choice => typeof choice === 'string')) {
            return;
        }
        this.question = question;
        this.examId = examId;
        this.choices = choices;
        this.answer = answer;
        this.valid = true;
    }
}
module.exports = QuestionCreateDTO