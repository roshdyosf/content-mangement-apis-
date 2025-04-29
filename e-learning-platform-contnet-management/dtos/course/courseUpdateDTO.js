class CourseUpdateDTO {
    constructor({ title, description, price, rating }) {
        this.valid = false
        if (!title && !description && price === undefined && rating === undefined) {
            return false
        }
        if (title) {
            this.title = title;
        }
        if (description) {
            this.description = description;
        }
        if (price !== undefined) {
            const priceNumber = Number(price);
            if (isNaN(priceNumber)) {
                return
            }
            this.price = priceNumber;
        }
        if (rating !== undefined) {
            this.rating = rating;
        }
        this.valid = true;
    }
}

module.exports = CourseUpdateDTO;