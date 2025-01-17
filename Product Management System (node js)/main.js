const express = require("express");
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const databaseUrl = process.env.DATABASE_URL;

const ProductRoutes = require('./Routers/ProductRoute')
const AuthRoutes = require('./Routers/AuthRoutes');
const errorHandler = require("./middlewares/ErrorHandler");

// Middleware
app.use(express.json()); // Parse JSON request bodies

// connect to database .
mongoose.connect(databaseUrl)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Connection error:', err));

// Mount Product routes
app.use('/api/Products', ProductRoutes); // All routes under '/api/students'

// Mount User routes
app.use('/api/User', AuthRoutes); // All routes under '/api/students'


// error handele
//app.use(errorHandler);
app.use(errorHandler);

// start server .

app.listen(port,()=>{
    console.log('Server is running on http://localhost:3000');
})