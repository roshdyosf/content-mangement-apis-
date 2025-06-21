class ExamUpdateDTO {
    constructor({ examId, title, questions }) {
        this.valid = true;
        if (!examId) {
            this.valid = false;
            this.error = 'examId is required';
            return;
        } else {
            this.examId = examId;
        }

        let hasUpdate = false;

        if (title !== undefined) {
            this.title = title;
            hasUpdate = true;
        }

        // questions: array of updates [{ qIndex, question, choices, answerIndex }]
        if (Array.isArray(questions) && questions.length > 0) {
            this.questions = [];
            for (const q of questions) {
                if (q.qIndex === undefined || isNaN(Number(q.qIndex))) {
                    this.valid = false;
                    this.error = 'Each question update must have a valid qIndex';
                    return;
                }
                const update = { qIndex: Number(q.qIndex) };
                if (q.question !== undefined) {
                    if (typeof q.question !== 'string' || q.question.trim() === '') {
                        this.valid = false;
                        this.error = 'Question text must be a non-empty string';
                        return;
                    }
                    update.question = q.question;
                }
                if (q.choices !== undefined) {
                    let choicesArray = [];
                    if (Array.isArray(q.choices)) {
                        choicesArray = q.choices.map(c => c.toString().trim());
                    } else if (typeof q.choices === 'string') {
                        choicesArray = q.choices.split(',').map(c => c.trim());
                    } else if (typeof q.choices === 'object' && q.choices !== null) {
                        choicesArray = Object.values(q.choices).map(c => c.toString().trim());
                    }
                    if (choicesArray.length < 2 || !choicesArray.every(c => typeof c === 'string' && c.length > 0)) {
                        this.valid = false;
                        this.error = 'Choices must be an array of at least two non-empty strings';
                        return;
                    }
                    update.choices = choicesArray;
                }
                if (q.answerIndex !== undefined) {
                    const answerIndex = Number(q.answerIndex);
                    if (typeof q.answerIndex !== 'string' || isNaN(answerIndex) || !Number.isInteger(answerIndex)) {
                        this.valid = false;
                        this.error = 'Answer index must be a string representing a valid integer';
                        return;
                    }
                    if (update.choices && (answerIndex < 0 || answerIndex >= update.choices.length)) {
                        this.valid = false;
                        this.error = 'Answer index must be a valid index of the choices array';
                        return;
                    }
                    update.answerIndex = q.answerIndex;
                }
                this.questions.push(update);
                hasUpdate = true;
            }
        }

        if (!hasUpdate) {
            this.valid = false;
            this.error = 'No update fields provided';
        }
    }
}
module.exports = ExamUpdateDTO;