const express = require('express');
const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth');
const { loginRules, registerRules, sendValidationErrors } = require('../middleware/validate');

const router = express.Router();

// Create a user account, hash the password, and return a login token.
router.post('/register', registerRules, sendValidationErrors, authController.register);

// Log in with an existing email and password, then return a fresh token.
router.post('/login', loginRules, sendValidationErrors, authController.login);

// Show the user data that is only available when a person is logged in.
router.get('/me', requireAuth, authController.me);

// Remove the token from the server-side session list.
router.post('/logout', requireAuth, authController.logout);

module.exports = router;
