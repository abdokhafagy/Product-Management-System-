const Joi = require('joi');

// Define validation schema for user registration
const userSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        'string.base': 'name must be a string',
        'string.min': 'name must be at least 3 characters long',
        'any.required': 'name is required'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
    })
});

module.exports = userSchema;