class ExamCreateDTO {
    constructor({ title, sectionId, courseId, mcq }) {
        this.valid = false;
        if (!title || !sectionId || !courseId) {
            this.error = 'Missing required fields';
            return;
        }
        if (typeof title !== 'string' || title.trim() === '') {
            this.error = 'Title must be a non-empty string';
            return;
        }
        // Require mcq to be an array
        if (!Array.isArray(mcq) || mcq.length < 2) {
            this.error = 'MCQ must be an array with at least two questions';
            return;
        }
        for (const question of mcq) {
            if (!question || typeof question !== 'object') {
                this.error = 'Each MCQ entry must be an object';
                return;
            }
            if (!question.question || typeof question.question !== 'string' || question.question.trim() === '') {
                this.error = 'Each question must have a valid question text';
                return;
            }
            // Always convert choices to array of strings (like tags in CourseCreateDTO)
            let choicesArray = [];
            if (Array.isArray(question.choices)) {
                choicesArray = question.choices.map(c => c.toString().trim());
            } else if (typeof question.choices === 'string') {
                choicesArray = question.choices.split(',').map(c => c.trim());
            } else if (typeof question.choices === 'object' && question.choices !== null) {
                choicesArray = Object.values(question.choices).map(c => c.toString().trim());
            }
            // Validate choices as a non-empty array of strings with at least two valid choices
            if (choicesArray.length < 2 || !choicesArray.every(c => typeof c === 'string' && c.length > 0)) {
                this.error = 'Each question must have at least two valid choices';
                return;
            }
            // answerIndex must be a string representing a valid integer index
            const answerIndex = Number(question.answerIndex);
            if (isNaN(answerIndex) || !Number.isInteger(answerIndex)) {
                this.error = 'Answer index must be a valid integer';
                return;
            }
            if (answerIndex < 0 || answerIndex >= choicesArray.length) {
                this.error = 'Answer index must be a valid index of the choices array';
                return;
            }
            // Assign normalized choices back to the question
            question.choices = choicesArray;
        }
        this.title = title;
        this.sectionId = sectionId;
        this.courseId = courseId;
        this.mcq = mcq;
        this.valid = true;
    }
}
module.exports = ExamCreateDTO;