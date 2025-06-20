class CourseCreateDTO {
    constructor({ title, description, price, tags, level }) {
        this.valid = false;
        // Check required fields
        if (!title || !description || price === undefined || price === null || tags === undefined) {
            console.error("Invalid course data: Missing required fields.");
            return;
        }

        // Convert price to number
        const priceNumber = Number(price);
        if (isNaN(priceNumber)) {
            console.error("Invalid course data: Price must be a number.");
            return;
        }

        // Always convert tags to array of strings
        let tagsArray = [];
        if (Array.isArray(tags)) {
            tagsArray = tags.map(tag => tag.toString().trim());
        } else if (typeof tags === 'string') {
            tagsArray = tags.split(',').map(tag => tag.trim());
        } else if (typeof tags === 'object' && tags !== null) {
            tagsArray = Object.values(tags).map(tag => tag.toString().trim());
        }
        // Validate tags as a non-empty array of strings
        if (tagsArray.length === 0 || !tagsArray.every(tag => typeof tag === 'string' && tag.length > 0)) {
            console.error("Invalid course data: Tags must be a non-empty array of strings.");
            return;
        }
        // Assign tags as an array of strings
        this.tags = tagsArray;

        // Validate level as a string, default to 'beginner' if not provided or invalid
        if (typeof level !== 'string' || level.trim() === '' || !['beginner', 'intermediate', 'advanced'].includes(level.toLowerCase())) {
            this.level = 'beginner';
        } else {
            this.level = level;
        }

        this.title = title;
        this.description = description;
        this.price = priceNumber;
        this.valid = true;
    }
}

module.exports = CourseCreateDTO;