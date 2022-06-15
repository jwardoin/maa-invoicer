const express = require('express')
const router = express.Router()
const newInvoiceController = require('../controllers/newInvoice')

router.post('/', newInvoiceController.createInvoice)

module.exports = router