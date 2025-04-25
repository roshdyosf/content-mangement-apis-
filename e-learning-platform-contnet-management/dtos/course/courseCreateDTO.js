class CourseCreateDTO {
    constructor({ title, description, price, educatorId, educator, tags }) {
        this.valid = false
        if (!title || !description || !price || !educatorId || !educator) {
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
        this.valid = true;
    }
}

module.exports = CourseCreateDTO;