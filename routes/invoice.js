const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoice');
const { ensureAuth } = require('../middleware/auth');

// @route   POST /invoice/newinvoice
// @desc    Create a new invoice
// @access  Private
router.post('/newinvoice', ensureAuth, invoiceController.createInvoice);

// @route   DELETE /invoice/delete
// @desc    Delete an invoice
// @access  Private
router.delete('/delete', ensureAuth, invoiceController.deleteInvoice);

module.exports = router;
