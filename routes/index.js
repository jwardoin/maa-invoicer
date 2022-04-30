const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../controllers/auth')

const User = require('../models/User')

router.get('/', ensureGuest, (req,res) => {
    res.render('login.ejs')
})

router.get('/invoicer', ensureAuth, (req,res) => {
    res.render('invoicer.ejs', { name: req.user.firstName })
})

module.exports = router