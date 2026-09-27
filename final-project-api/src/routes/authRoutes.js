const express = require('express');
const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/oauth/status', authController.oauthStatus);
router.get('/github', authController.githubLogin);
router.get('/github/callback', authController.githubCallback);
router.get('/me', requireAuth, authController.me);
router.post('/logout', requireAuth, authController.logout);

module.exports = router;
