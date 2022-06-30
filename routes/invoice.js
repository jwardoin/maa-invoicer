const express = require('express')
const router = express.Router()
const invoiceController = require('../controllers/invoice')

router.post('/newinvoice', invoiceController.createInvoice)
router.delete('/delete', invoiceController.deleteInvoice)

module.exports = router