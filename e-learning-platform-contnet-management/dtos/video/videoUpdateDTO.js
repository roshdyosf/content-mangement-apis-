class VideoUpdateDTO {
    constructor({ title, description, order }) {
        this.valid = false
        if (!title && !description && !order) {
            return
        }
        if (order !== undefined) {
            const orderNumber = Number(order);
            if (isNaN(priceNumber)) {
                return
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

module.exports = VideoUpdateDTO;