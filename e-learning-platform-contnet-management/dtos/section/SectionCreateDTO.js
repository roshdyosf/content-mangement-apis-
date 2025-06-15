class SectionCreateDTO {
    constructor({ title, order, courseId }) {
        this.valid = false
        if (!title || !order || !courseId) {
            return
        }
        const orderNumber = Number(order);

        if (isNaN(orderNumber)) {
            return
        }
        this.valid = true;
        this.title = title;
        this.order = orderNumber;
        this.courseId = courseId;

    }

}
module.exports = SectionCreateDTO;