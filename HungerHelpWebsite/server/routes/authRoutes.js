const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { auth } = require('../middleware/auth');

// Register new user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);

// Verify NGO
router.get('/verify-ngo/:token', authController.verifyNGO);

// Get user profile (requires authentication)
router.get('/profile', auth, authController.getUserProfile);

// Update user profile (requires authentication)
router.put('/profile', auth, authController.updateProfile);

module.exports = router; 