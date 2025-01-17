const bcrypt = require('bcryptjs');
const User = require('../Models/UserModel');
const userSchema = require('../validators/UserValidation'); // Import validation schema
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
// Register a new user
const registerUser = async (req, res) => {
    try {
        // Validate request body using Joi
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: 'Validation Error', details: error.details });
        }

        const { name, email, password } = req.body;

        // Check if email or name already exists
        const existingUser = await User.findOne({ $or: [{ email }, { name }] });
        if (existingUser) {
            return res.status(409).json({ message: 'name or email already exists' });
        }

        // Hash the password
        const saltRounds = 10; // Determines the cost of hashing (higher is more secure but slower)
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create the user with the hashed password
        const newUser = new User({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();

        res.status(201).json({
            message: 'User registered successfully',
            user: { id: savedUser._id, name: savedUser.name, email: savedUser.email }
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to register user', error });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT with user ID and role
        const token = jwt.sign(
            { id: user._id, role: user.isAdmin},
            jwtSecret,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { loginUser ,registerUser };