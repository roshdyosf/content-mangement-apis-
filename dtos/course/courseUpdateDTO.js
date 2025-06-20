class CourseUpdateDTO {
    constructor({ title, description, tags, price, rating }) {
        this.valid = false;
        if (!title && !description && !tags && price === undefined && rating === undefined) {
            return false;
        }
        if (title) {
            this.title = title;
        }
        // Validate tags as an array of strings (allow one or more tags)
        if (tags) {
            if (!Array.isArray(tags) || tags.length === 0 || !tags.every(tag => typeof tag === 'string')) {
                console.error("Invalid course data: Tags must be a non-empty array of strings.");
                return;
            }
            this.tags = tags;
        }
        if (description) {
            this.description = description;
        }
        if (price !== undefined) {
            const priceNumber = Number(price);
            if (isNaN(priceNumber)) {
                return;
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