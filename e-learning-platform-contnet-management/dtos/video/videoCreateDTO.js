class VideoCreateDTO {
    constructor({ title, order, courseId, sectionId }) {
        this.valid = false
        if (!title || !order || !courseId || !sectionId) {
            return
        }
        const orderNumber = Number(order);
        if (isNaN(orderNumber)) {
            return
        }

        this.title = title;
        this.order = orderNumber;
        this.courseId = courseId;
        this.sectionId = sectionId;
        this.valid = true;
    }
}

module.exports = VideoCreateDTO;