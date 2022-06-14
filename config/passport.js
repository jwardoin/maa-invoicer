const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')
const { google } = require('googleapis')
const fs = require('fs')
const path = require('path')

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        
        // Save access token
        let tokens = {
            access_token: accessToken
        }

        // Save Token to server
        fs.writeFile(__dirname + `/tokens/${profile.id}_tokens.json`, JSON.stringify(tokens), err => {
            if (err) {
                console.error(err)
            }
        })
        try {
            let thisUser = await User.findOne({ googleId: profile.id })

            if(thisUser) {

                done(null, thisUser)

            } else {

                const oauth2Client = new google.auth.OAuth2(
                    process.env.GOOGLE_CLIENT_ID,
                    process.env.GOOGLE_CLIENT_SECRET,
                    '/auth/google/callback'
                )
            
                let pathToJSON = path.resolve(`./config/tokens/${profile.id}_tokens.json`)
                const token = JSON.parse(fs.readFileSync(pathToJSON))
                oauth2Client.setCredentials(token)
        
                const calendar = google.calendar({ 
                    version: 'v3',
                    auth: oauth2Client //can i just pass access token here?
                })

                const calendarList = await calendar.calendarList.list()
               
                const calendarReturns = []

                calendarList.data.items.forEach(c => {
                    if(c.summaryOverride) {
                       calendarReturns.push([c.summaryOverride, c.id])
                    } else {
                        calendarReturns.push([c.summary, c.id])
                    }
                })
                
                const newUser = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    image: profile.photos[0].value,
                    // setting these to "empty" for user to update after authentication
                    hourlyRate: 0,
                    lessonCalendarId: 'Please Choose a Calendar',
                    // adds all user's calendars to an array to choose from when updating lessonCalendarId
                    googleCalendarIds: calendarReturns
                    
                }

                thisUser = await User.create(newUser)
                done(null, thisUser)
            }
        } catch (error) {
            console.error(error)
        }
        
    }
    ))

    
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (error, user) => done(error, user))
    })
}

