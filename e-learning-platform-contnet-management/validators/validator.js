const isValidField = (value, expectedType) => {
    // Check type
    if (typeof value !== expectedType) {
        return false;
    }

    // Additional checks based on type
    if (expectedType === 'string') {
        if (value.trim() === '') {
            return false; // Empty string
        }
        if (value.length < 3 || value.length > 100) {
            return false; // Length constraints
        }
    } else if (expectedType === 'number') {
        const orderNumber = Number(value);
        if (isNaN(orderNumber)) {
            console.log(orderNumber);

            return false
        }
    }

    return true;
};

module.exports = isValidField;