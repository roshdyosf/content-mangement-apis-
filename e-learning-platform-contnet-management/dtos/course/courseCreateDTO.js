class CourseCreateDTO {
    constructor({ title, description, price, educatorId, educator }) {
        if (!title || !description || !price || !educatorId || !educator) {
            return false
        }
        const priceNumber = Number(price);

        if (isNaN(priceNumber)) {
            return false
        }
        this.title = title;
        this.description = description;
        this.price = priceNumber;
        this.educatorId = educatorId;
        this.educator = educator;
        this.valid = true;
    }

}
module.exports = CourseCreateDTO;