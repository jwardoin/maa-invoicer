const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const indexController = require('../controllers/index')

const User = require('../models/User')

router.get('/', ensureGuest, indexController.getLogin)
router.get('/dashboard', ensureAuth, indexController.getDashboard)

module.exports = router