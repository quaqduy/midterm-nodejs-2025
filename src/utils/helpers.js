// src/utils/helpers.js

// Validate email format
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate required fields
const validateRequiredFields = (data, requiredFields) => {
    const errors = [];

    requiredFields.forEach(field => {
        if (!data[field] || data[field].toString().trim() === '') {
            errors.push(`${field} is required`);
        }
    });

    return errors;
};

// Sanitize user input
const sanitizeInput = (input) => {
    if (typeof input === 'string') {
        return input.trim().replace(/[<>]/g, '');
    }
    return input;
};

// Generate random number between min and max
const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Format date to readable string
const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

module.exports = {
    validateEmail,
    validateRequiredFields,
    sanitizeInput,
    generateRandomNumber,
    formatDate
};