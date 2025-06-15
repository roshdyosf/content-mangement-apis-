class CourseCreateDTO {
    constructor({ title, description, price, educatorId, educator, tags, level }) {
        this.valid = false
        if (!title || !description || price === undefined || price === null || educatorId === undefined || educatorId === null || !educator || !level) {
            console.error("Invalid course data: Missing required fields.");
            return;
        }

        const priceNumber = Number(price);
        if (isNaN(priceNumber)) {
            console.error("Invalid course data: Price must be a number.");
            return;
        }

        // Validate tags as an array of strings
        if (!Array.isArray(tags) || !tags.every(tag => typeof tag === 'string')) {
            console.error("Invalid course data: Tags must be an array of strings.");
            return;
        }

        this.title = title;
        this.description = description;
        this.price = priceNumber;
        this.educatorId = educatorId;
        this.educator = educator;
        this.tags = tags;
        this.level = level;
        this.valid = true;
    }
}

module.exports = CourseCreateDTO;