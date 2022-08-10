const express = require('express');
const passport = require('passport');
const router = express.Router();

// Scopes assigned to variables for readability
const googleCalendars = 'https://www.googleapis.com/auth/calendar.readonly';
const googleEvents = 'https://www.googleapis.com/auth/calendar.events.readonly';

// @route   GET /auth/login/success
// @desc    Send user data with successful login
router.get('/login/success', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'success',
    user: req.user,
  });
});

// @route   GET /auth/login/failure
// @desc    Send auth failure message
router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'failure',
  });
});

// @route   GET /auth/google
// @desc    Open Google Auth server for user to accept access to given scopes
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', googleCalendars, googleEvents],
  })
);

// @route   GET /auth/google/callback
// @desc    Redirect user based on success or failure to authorize
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URI,
    failureRedirect: `${process.env.CLIENT_URI}/login/failed`,
  })
);

// @route   GET /auth/logout
// @desc    Log user out
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(`${process.env.CLIENT_URI}/login`);
});

module.exports = router;
