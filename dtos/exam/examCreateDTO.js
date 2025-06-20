class ExamCreateDTO {
    constructor({ title, sectionId, courseId }) {
        this.valid = false
        if (!title || !sectionId || !courseId) {
            return;
        }

        this.title = title;
        this.sectionId = sectionId;
        this.courseId = courseId;
        this.valid = true;
    }
}
module.exports = ExamCreateDTO