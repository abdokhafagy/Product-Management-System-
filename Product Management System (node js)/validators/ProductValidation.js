const Joi = require('joi');

// Define a Joi schema for product data
const productSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'Name must be a string',
        'any.required': 'Name is required'
    }),
    description: Joi.string().required().messages({
        'string.base': 'Description must be a string',
        'any.required': 'Description is required'
    }),
    price: Joi.number().required().messages({
        'number.base': 'Price must be a number',
        'any.required': 'Price is required'
    }),
    imageUrl: Joi.string().uri().required().messages({
        'string.base': 'Image URL must be a string',
        'string.uri': 'Image URL must be a valid URI',
        'any.required': 'Image URL is required'
    })
});

module.exports = productSchema;
