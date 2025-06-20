class CourseUpdateDTO {
    constructor({ title, description, tags, price, rating, level }) {
        this.valid = false;
        let hasValidField = false;

        if (title !== undefined) {
            this.title = title;
            hasValidField = true;
        }
        if (description !== undefined) {
            this.description = description;
            hasValidField = true;
        }
        if (tags !== undefined) {
            let tagsArray = [];
            if (Array.isArray(tags)) {
                tagsArray = tags.map(tag => tag.toString().trim());
            } else if (typeof tags === 'string') {
                tagsArray = tags.split(',').map(tag => tag.trim());
            } else if (typeof tags === 'object' && tags !== null) {
                tagsArray = Object.values(tags).map(tag => tag.toString().trim());
            }
            // Always assign tags as an array of strings
            this.tags = tagsArray;
            // Validate tags
            if (tagsArray.length === 0 || !tagsArray.every(tag => typeof tag === 'string' && tag.length > 0)) {
                console.error("Invalid course data: Tags must be a non-empty array of strings.");
                return;
            }
            hasValidField = true;
        }
        if (price !== undefined) {
            const priceNumber = Number(price);
            if (isNaN(priceNumber)) {
                console.error("Invalid course data: Price must be a number.");
                return;
            }
            this.price = priceNumber;
            hasValidField = true;
        }
        if (rating !== undefined) {
            this.rating = rating;
            hasValidField = true;
        }
        // Level validation logic (allow only beginner, intermediate, advanced)
        if (level !== undefined) {
            if (typeof level !== 'string' || level.trim() === '' || !['beginner', 'intermediate', 'advanced'].includes(level.toLowerCase())) {
                this.level = 'beginner';
            } else {
                this.level = level;
            }
            hasValidField = true;
        }
        if (!hasValidField) {
            console.error("At least one field must be provided for update.");
            return;
        }
        this.valid = true;
    }
}

module.exports = CourseUpdateDTO;