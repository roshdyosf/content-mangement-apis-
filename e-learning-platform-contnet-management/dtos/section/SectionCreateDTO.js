class SectionCreateDTO {
    constructor({ title, description, order, courseId }) {
        if (!title || !description || !order || !courseId) {
            return false
        }
        const orderNumber = Number(order);

        if (isNaN(orderNumber)) {
            return false
        }
        this.valid = true;
        this.title = title;
        this.description = description;
        this.order = orderNumber;
        this.courseId = courseId;

    }

}
module.exports = SectionCreateDTO;