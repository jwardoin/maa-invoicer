const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const indexController = require('../controllers/index')

router.get('/', ensureAuth, indexController.getDashboard)

module.exports = router