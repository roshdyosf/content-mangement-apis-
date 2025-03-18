class VideoCreateDTO {
    constructor({ title, description, order, courseId, sectionId }) {
        if (!title || !description || !order || !courseId || !sectionId) {
            return { success: false }
        }
        const orderNumber = Number(order);
        if (isNaN(orderNumber)) {
            return false;
        }
        this.valid = true;
        this.title = title;
        this.description = description;
        this.order = orderNumber;
        this.courseId = courseId;
        this.sectionId = sectionId;
    }
}

module.exports = VideoCreateDTO;