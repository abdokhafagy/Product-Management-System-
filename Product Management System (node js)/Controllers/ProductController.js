const Product = require('../Models/ProductModel');
const productSchema = require('../validators/ProductValidation');

const createProduct = async (req, res) => {
    try {
        // validation 
        const { error } = productSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: 'Validation Error', details: error.details });
        }
        //name, description, price, and imageUrl 
        // Destructure the necessary fields from the request body
        const { name, description, price } = req.body;

        // Check if a file was uploaded
        let imageUrl = null;
        if (req.file) {
            // Set the image URL to the file path
            imageUrl = req.file.path;
        }
        const createdProduct = new Product({ name, description, price, imageUrl });
        await createdProduct.save();

        res.status(201).json(createdProduct);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to create Product', err });
    }
};

// Get all Products
const getAllProducts = async (req, res) => {
    try {
        const Products = await Product.find(); // Retrieve all Products from the database
        res.status(200).json(Products); // Respond with the list of Products
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch Product', error });
    }
};

// Get a Product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params; // Extract Product ID from request params
        const Product = await Product.findById(id); // Find the Product by ID
        if (!Product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(Product); // Respond with the found Product
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch Product', error });
    }
};

// Update a Product by ID
const updateProduct = async (req, res) => {
    try {
        // validation 
        const { error } = productSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: 'Validation Error', details: error.details });
        }

        const { id } = req.params; // Extract Product ID from request params
        const { name, age, grade } = req.body; // Extract updated data from request body
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, age, grade }, // Updated data
            { new: true, runValidators: true } // Return updated document and apply validation
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct); // Respond with the updated Product
    } catch (error) {
        res.status(500).json({ message: 'Failed to update Product', error });
    }
};

// Delete a Product by ID
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params; // Extract Product ID from request params
        const deletedProduct = await Product.findByIdAndDelete(id); // Delete the Product by ID
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete Product', error });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};