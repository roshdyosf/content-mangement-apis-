class CourseCreateDTO {
    constructor({ title, description, price, tags, level }) {
        this.valid = false
        if (!title || !description || price === undefined || price === null || !level) {
            console.error("Invalid course data: Missing required fields.");
            return;
        }

        const priceNumber = Number(price);
        if (isNaN(priceNumber)) {
            console.error("Invalid course data: Price must be a number.");
            return;
        }

        // Validate tags as a non-empty array of strings (one or more tags required)
        if (!Array.isArray(tags) || tags.length === 0 || !tags.every(tag => typeof tag === 'string')) {
            console.error("Invalid course data: Tags must be a non-empty array of strings.");
            return;
        }

        this.title = title;
        this.description = description;
        this.price = priceNumber;
        this.tags = tags;
        this.level = level;
        this.valid = true;
    }
}

module.exports = CourseCreateDTO;