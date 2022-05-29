const express = require('express')
const router = express.Router()
const newInvoiceController = require('../controllers/newInvoice')

router.get('/', newInvoiceController.getNewInvoice)
router.post('/createInvoice', newInvoiceController.createInvoice)

module.exports = router