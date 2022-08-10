const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const indexController = require('../controllers/index');

// @route   GET /
// @desc    Get user dashboard
// @access  Private
router.get('/', ensureAuth, indexController.getDashboard);

module.exports = router;
