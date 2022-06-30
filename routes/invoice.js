const express = require('express')
const router = express.Router()
const invoiceController = require('../controllers/invoice')

router.get('/', invoiceController.getInvoice)

module.exports = router