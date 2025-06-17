class CourseCreateDTO {
    constructor({ title, description, price, educator, tags = [], level }) {
        this.valid = false;
        this.errors = [];

        // Required field validation
        if (!title) this.errors.push("Title is required");
        if (!description) this.errors.push("Description is required");
        if (price === undefined || price === null) this.errors.push("Price is required");
        if (!educator) this.errors.push("Educator is required");
        if (!level) this.errors.push("Level is required");

        // Price validation
        const priceNumber = Number(price);
        if (isNaN(priceNumber) || priceNumber < 0) {
            this.errors.push("Price must be a valid non-negative number");
        }

        // Level validation
        const validLevels = ['Beginner', 'Intermediate', 'Advanced'];
        if (!validLevels.includes(level)) {
            this.errors.push(`Level must be one of: ${validLevels.join(', ')}`);
        }

        // Tags validation (optional)
        if (tags && (!Array.isArray(tags) || !tags.every(tag => typeof tag === 'string'))) {
            this.errors.push("Tags must be an array of strings");
        }

        // If there are no errors, set the properties
        if (this.errors.length === 0) {
            this.title = title;
            this.description = description;
            this.price = priceNumber;
            this.educator = educator;
            this.tags = tags;
            this.level = level;
            this.valid = true;
        }
    }

    getErrors() {
        return this.errors;
    }
}

module.exports = CourseCreateDTO;