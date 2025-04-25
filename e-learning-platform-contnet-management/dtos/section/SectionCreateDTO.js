class SectionCreateDTO {
    constructor({ title, description, order, courseId }) {
        this.valid = false
        if (!title || !description || !order || !courseId) {
            return
        }
        const orderNumber = Number(order);

        if (isNaN(orderNumber)) {
            return
        }
        this.valid = true;
        this.title = title;
        this.description = description;
        this.order = orderNumber;
        this.courseId = courseId;

    }

}
module.exports = SectionCreateDTO;