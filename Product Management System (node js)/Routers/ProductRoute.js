const express = require('express');
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../Controllers/ProductController'); // Import controller functions
const authorizeAdmin = require('../middlewares/Authorize');
const router = express.Router();

// Route for creating a new Product
router.post('/',authorizeAdmin, createProduct);

// Route for fetching all Product
router.get('/', getAllProducts);

// Route for fetching a Product by ID
router.get('/:id', getProductById);

// Route for updating a Product by ID
router.put('/:id',authorizeAdmin, updateProduct);

// Route for deleting a Product by ID
router.delete('/:id',authorizeAdmin, deleteProduct);

module.exports = router;