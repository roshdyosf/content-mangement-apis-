const isValidField = require('./validator');

const genericValidator = (data, validations, fieldsToValidate) => {
    // Filter validations based on fieldsToValidate
    const filteredValidations = Object.keys(validations)
        .filter((key) => fieldsToValidate.includes(key))
        .reduce((obj, key) => {
            obj[key] = validations[key];
            return obj;
        }, {});

    // Check for extra fields not allowed
    // const extraFields = Object.keys(data).filter(
    //     (key) => !Object.keys(filteredValidations).includes(key)
    // );
    // if (extraFields.length > 0) {
    //     return {
    //         valid: false,
    //         message: `Extra fields not allowed: ${extraFields.join(', ')}`,
    //     };
    // }

    // Check for missing required fields
    // const missingFields = Object.keys(filteredValidations).filter(
    //     (key) => !Object.keys(data).includes(key)
    // );
    // if (missingFields.length > 0) {
    //     return {
    //         valid: false,
    //         message: `Missing required fields: ${missingFields.join(', ')}`,
    //     };
    // }

    // Validate allowed fields
    const invalidField = Object.keys(data).find((field) => {
        if (filteredValidations[field]) {
            if (!isValidField(data[field], filteredValidations[field])) {
                return true;
            }
        }
        return false;
    });

    if (invalidField) {
        return {
            valid: false,
            invalidField,
            expectedType: filteredValidations[invalidField],
        };
    }

    return { valid: true };
};

module.exports = genericValidator;