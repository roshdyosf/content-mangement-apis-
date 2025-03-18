class SectionUpdateDTO {
    constructor({ title, description, order }) {
        if (!title && !description && !order) {
            return false
        }
        if (order !== undefined) {
            const orderNumber = Number(order);
            if (isNaN(orderNumber)) {
                return false
            }
            this.order = orderNumber;
        }
        if (title) {
            this.title = title;
        }
        if (description) {
            this.description = description;
        }
        this.valid = true;
    }
}

module.exports = SectionUpdateDTO;