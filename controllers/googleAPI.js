const { google } = require('googleapis')
const fs = require('fs')
const path = require('path')

// can I just export this client to make my code DRYer?
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    '/auth/google/callback'
)

let pathToJSON = path.resolve(`./config/tokens/${profile.id}_tokens.json`)
const token = JSON.parse(fs.readFileSync(pathToJSON))
oauth2Client.setCredentials(token)
        

module.exports = { oauth2Client }