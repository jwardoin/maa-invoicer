const express = require('express')
const passport = require('passport')
const router = express.Router()

// Scopes assigned to variables for readability
const googleCalendars = 'https://www.googleapis.com/auth/calendar.readonly'
const googleEvents = 'https://www.googleapis.com/auth/calendar.events.readonly'

router.get('/google', passport.authenticate('google', { scope: ['profile', googleCalendars, googleEvents] }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req,res) => {
    res.redirect("/invoicer")
})

router.get('/logout', (req,res)=>{
    req.logout()
    res.redirect('/')
})

module.exports = router