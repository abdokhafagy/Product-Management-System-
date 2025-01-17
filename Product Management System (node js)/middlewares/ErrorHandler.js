// Centralized Error Handler
const errorHandler = (err, req, res, next) => {
    // Log the error message to the console
    console.error(err.message); // Log the error message

    // Send a simple error response
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
};

module.exports = errorHandler;