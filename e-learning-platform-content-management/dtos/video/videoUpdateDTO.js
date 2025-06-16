class VideoUpdateDTO {
    constructor({ title, order }) {
        this.valid = false
        if (!title && order === undefined) {
            return
        }
        if (order !== undefined) {
            const orderNumber = Number(order);
            if (isNaN(orderNumber)) {
                return
            }
            this.order = orderNumber;
        }
        if (title) {
            this.title = title;
        }

        this.valid = true;
    }
}

module.exports = VideoUpdateDTO;