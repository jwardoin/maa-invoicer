const express = require('express')
const passport = require('passport')
const router = express.Router()

// Scopes assigned to variables for readability
const googleCalendars = 'https://www.googleapis.com/auth/calendar.readonly'
const googleEvents = 'https://www.googleapis.com/auth/calendar.events.readonly'

router.get('/login/success', (req,res)=>{
    res.status(200).json({
        success: true,
        message: "success",
        user: req.user
    })
})

router.get('/login/failed', (req,res)=>{
    res.status(401).json({
        success: false,
        message: "failure"
    })
})

router.get('/google', passport.authenticate('google', { scope: ['profile', googleCalendars, googleEvents] }))

router.get('/google/callback', passport.authenticate('google', { 
    successRedirect: process.env.CLIENT_URI,
    failureRedirect: `${process.env.CLIENT_URI}/login/failed` 
}))

router.get('/logout', (req,res)=>{
    req.logout()
    res.redirect(`${process.env.CLIENT_URI}/login`)
})

module.exports = router