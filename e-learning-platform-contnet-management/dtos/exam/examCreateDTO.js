class ExamCreateDTO {
    constructor({ title, sectionId, courseId, educatorId }) {
        this.valid = false
        if (!title || !sectionId || !courseId || !educatorId) {
            return;
        }

        this.title = title;
        this.sectionId = sectionId;
        this.courseId = courseId;
        this.educatorId = educatorId;
        this.valid = true;
    }
}
module.exports = ExamCreateDTO