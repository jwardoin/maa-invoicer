const express = require('express');
const router = express.Router();
const accountSettingsController = require('../controllers/accountSettings');
const { ensureAuth } = require('../middleware/auth');

// @route   PUT accountsettings/posts
// @desc    Update setting
// @access  Private
router.put('/update', ensureAuth, accountSettingsController.changeSetting);

// @route   DELETE accountsettings/deleteaccount
// @desc    Delete user and all associated invoices
// @access  Private
router.delete(
  '/deleteaccount',
  ensureAuth,
  accountSettingsController.deleteAccount
);

module.exports = router;
