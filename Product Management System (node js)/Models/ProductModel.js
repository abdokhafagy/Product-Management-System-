//name, description, price, and imageUrl 
const mongoose = require('mongoose');

// create schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl:{ type: String },
}
);

// create model 
const Product = mongoose.model('Products', productSchema);

// export module
module.exports = Product;