class ExamCreateDTO {
    constructor({ sectionId, question, choices, answer }) {
        if (!sectionId || !question || !choices || !answer) {
            return false;
        }
        // Validate choices as an array of strings
        if (!Array.isArray(choices) || !choices.every(choice => typeof choice === 'string')) {
            return false;
        }
        this.sectionId = sectionId;
        this.question = question;
        this.choices = choices;
        this.answer = answer;
        this.valid = true;
    }
}
module.exports = ExamCreateDTO