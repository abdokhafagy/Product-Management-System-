const express = require('express');
const { loginUser, registerUser } = require('../Controllers/AuthController');
const router = express.Router();

// Login route (POST /login)
router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router;