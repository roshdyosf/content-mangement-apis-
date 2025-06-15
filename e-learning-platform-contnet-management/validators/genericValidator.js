const isValidField = require('./validator');

const genericValidator = (data, validations, fieldsToValidate) => {
    // Filter validations based on fieldsToValidate
    const filteredValidations = Object.keys(validations)
        .filter((key) => fieldsToValidate.includes(key))
        .reduce((obj, key) => {
            obj[key] = validations[key];
            return obj;
        }, {});

    const invalidField = Object.keys(data).find((field) => {
        if (filteredValidations[field]) {
            if (!isValidField(data[field], filteredValidations[field])) {
                console.error(
                    `Invalid field: ${field}, expected type: ${filteredValidations[field]}, received value: ${data[field]}`
                );
                return true;
            }
        }
        return false;
    });

    if (invalidField) {
        console.error(
            `Invalid field: ${invalidField}, expected type: ${filteredValidations[invalidField]}, received value: ${data[invalidField]}`
        );
        return {
            valid: false,
            invalidField,
            expectedType: filteredValidations[invalidField],
        };
    }

    return { valid: true };
};

module.exports = genericValidator;