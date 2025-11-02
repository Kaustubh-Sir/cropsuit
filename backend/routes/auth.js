const express = require('express');
const passport = require('passport');
const router = express.Router();
const { getMe, updateProfile, logout, deleteAccount } = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/auth');

// Google OAuth routes
router.get(
  '/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { 
    failureRedirect: process.env.FRONTEND_URL || 'http://localhost:3000/login' 
  }),
  (req, res) => {
    // Successful authentication, redirect to frontend
    res.redirect(process.env.FRONTEND_URL || 'http://localhost:3000/dashboard');
  }
);

// Get current user
router.get('/me', isAuthenticated, getMe);

// Update user profile
router.put('/profile', isAuthenticated, updateProfile);

// Logout
router.get('/logout', isAuthenticated, logout);

// Delete account
router.delete('/account', isAuthenticated, deleteAccount);

// Check authentication status
router.get('/status', (req, res) => {
  res.json({
    authenticated: req.isAuthenticated(),
    user: req.isAuthenticated() ? req.user : null,
  });
});

module.exports = router;
