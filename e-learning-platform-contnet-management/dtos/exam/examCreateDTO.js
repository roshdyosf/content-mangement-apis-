class ExamCreateDTO {
    constructor({ title, sectionId, courseId, educatorId }) {
        if (!title || !sectionId || !courseId || !educatorId) {
            return false;
        }

        this.title = title;
        this.sectionId = sectionId;
        this.courseId = courseId;
        this.educatorId = educatorId;
        this.valid = true;
    }
}
module.exports = ExamCreateDTO