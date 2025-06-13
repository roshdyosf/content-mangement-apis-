class CourseCreateDTO {
    constructor({ title, description, price, educatorId, educator, tags, level }) {
        this.valid = false
        if (!title || !description || !price || !educatorId || !educator || !level) {
            return;
        }

        const priceNumber = Number(price);
        if (isNaN(priceNumber)) {
            return;
        }

        // Validate tags as an array of strings
        if (!Array.isArray(tags) || !tags.every(tag => typeof tag === 'string')) {
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