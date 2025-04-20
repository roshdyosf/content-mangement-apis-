const isValidField = (value, expectedType) => {
    // Check for array type
    if (expectedType.startsWith('array<')) {
        if (!Array.isArray(value)) {
            return false; // Value is not an array
        }

        // Extract the type of elements in the array (e.g., 'string' from 'array<string>')
        const elementType = expectedType.slice(6, -1);

        // Validate each element in the array
        for (const element of value) {
            if (typeof element !== elementType) {
                return false; // Element type does not match
            }

            // Additional checks for strings (e.g., non-empty, length constraints)
            if (elementType === 'string' && (element.trim() === '' || element.length < 3 || element.length > 100)) {
                return false;
            }
        }

        return true; // All elements are valid
    }

    // Check type for non-array fields
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
            return false;
        }
    }

    return true;
};

module.exports = isValidField;