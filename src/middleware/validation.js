// src/middleware/validation.js
const { validateEmail, validateRequiredFields } = require('../utils/helpers');

const userValidation = {
    // Middleware validate create user
    validateCreateUser: (req, res, next) => {
        const requiredFields = ['name', 'email'];
        const validationErrors = validateRequiredFields(req.body, requiredFields);

        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: validationErrors
            });
        }

        if (!validateEmail(req.body.email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        next();
    },

    // Middleware validate update user
    validateUpdateUser: (req, res, next) => {
        if (req.body.email && !validateEmail(req.body.email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        next();
    },

    // Middleware validate ID parameter
    validateIdParam: (req, res, next) => {
        const { id } = req.params;

        if (!id || id.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

        next();
    }
};

module.exports = userValidation;