const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const cors = require('cors');

// Initiates the google oauth 2.0 authentication flow
router.get('/google', authController.googleAuth);

// Callback URL for handling the OAuth 2.0 response
router.get('/google/callback', authController.googleAuthCallback);

// Success login route
router.get('/success', authController.successLogin);

// Failed login route
router.get('/failed', authController.failedLogin);

// Logout route
router.get('/logout', authController.logout);

// Get all profiles route
router.get('/profiles', authController.getAllProfiles);

// Get logged in user id route
router.get('/user', authController.getLoggedInUser);



module.exports = router;
