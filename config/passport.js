const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value,
            // setting these to "empty" for user to update after authentication
            hourlyRate: 0,
            lessonCalendarId: "Please Choose a Calendar"
        }

        try {
            let thisUser = await User.findOne({ googleId: profile.id })

            if(thisUser) {
                done(null, thisUser)
            } else {
                thisUser = await User.create(newUser)
            }
        } catch (error) {
            console.error(error)
        }
    })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (error, user) => done(error, user))
    })
}