class ExamUpdateDTO {
    constructor({ examId, title, question, qIndex, choice, cIndex, answer }) {
        this.valid = true;
        if (!examId) {
            this.valid = false;
            this.error = 'examId is required';
        } else {
            this.examId = examId;
        }

        // Track if at least one field is being updated
        let hasUpdate = false;

        if (title !== undefined) {
            this.title = title;
            hasUpdate = true;
        }

        if (question !== undefined) {
            if (qIndex === undefined || isNaN(Number(qIndex))) {
                this.valid = false;
                this.error = 'Valid qIndex is required for question update';
            } else {
                this.qIndex = Number(qIndex);
                this.question = question;
                hasUpdate = true;
            }
        }

        if (choice !== undefined) {
            if (qIndex === undefined || isNaN(Number(qIndex)) || cIndex === undefined || isNaN(Number(cIndex))) {
                this.valid = false;
                this.error = 'Valid qIndex and cIndex are required for choice update';
            } else {
                this.qIndex = Number(qIndex);
                this.cIndex = Number(cIndex);
                this.choice = choice;
                hasUpdate = true;
            }
        }

        if (answer !== undefined) {
            if (qIndex === undefined || isNaN(Number(qIndex))) {
                this.valid = false;
                this.error = 'Valid qIndex is required for answer update';
            } else {
                this.qIndex = Number(qIndex);
                this.answer = answer;
                hasUpdate = true;
            }
        }

        if (!hasUpdate) {
            this.valid = false;
            this.error = 'No update fields provided';
        }
    }
}
module.exports = ExamUpdateDTO