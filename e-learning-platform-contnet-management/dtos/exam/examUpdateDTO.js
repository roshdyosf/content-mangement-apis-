class ExamUpdateDTO {
    constructor({ examId, title, question, questionIndex, choice, choiceIndex, answer }) {
        this.valid = false;
        if (!examId) return;
        this.examId = examId;

        // Only one update per request
        if (question !== undefined && questionIndex !== undefined) {
            this.option = "question";
            this.questionIndex = Number(questionIndex);
            if (isNaN(this.questionIndex)) return;
            this.question = question;
            this.valid = true;
            return;
        }

        if (choice !== undefined && questionIndex !== undefined && choiceIndex !== undefined) {
            this.option = "choice";
            this.questionIndex = Number(questionIndex);
            this.choiceIndex = Number(choiceIndex);
            if (isNaN(this.questionIndex) || isNaN(this.choiceIndex)) return;
            this.choice = choice;
            this.valid = true;
            return;
        }

        if (answer !== undefined && questionIndex !== undefined) {
            this.option = "answer";
            this.questionIndex = Number(questionIndex);
            if (isNaN(this.questionIndex)) return;
            this.answer = answer;
            this.valid = true;
            return;
        }
        if (title !== undefined) {
            this.option = "title";
            this.title = title;
            this.valid = true;
            return;
        }
    }
}
module.exports = ExamUpdateDTO