const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
// Middleware to check if the user is an admin
const authorizeAdmin = (req, res, next) => {
    try {
        // Get token from custom header 'x-auth-token'
        const token = req.headers['x-auth-token'];
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: 'No token provided in x-auth-token header' });
        }

        // Verify and decode the token
        const decodedPayload = jwt.verify(token, jwtSecret);
        console.log(decodedPayload);

        // Check if the user is an admin
        if (!decodedPayload.isAdmin) {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token', error });
    }
};

module.exports = authorizeAdmin;
