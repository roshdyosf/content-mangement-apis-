class CourseUpdateDTO {
    constructor({ title, description, price, rating }) {
        if (!title && !description && !price && !rating) {
            return false
        }
        if (title) {
            this.title = title;
        }
        if (description) {
            this.description = description;
        }
        if (price) {
            const priceNumber = Number(price);
            if (isNaN(priceNumber)) {

                return false
            }
            this.price = priceNumber;
        }
        if (rating) {
            this.rating = rating;
        }
        this.valid = true;
    }
}

module.exports = CourseUpdateDTO;