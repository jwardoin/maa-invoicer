const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../controllers/auth')

const User = require('../models/User')

router.get('/', ensureGuest, (req,res) => {
    res.render('login')
})

router.get('/invoicer', ensureAuth, async (req,res) => {
    // add try/catch later
    res.render('invoicer', {name: req.user.firstName})
})

module.exports = router