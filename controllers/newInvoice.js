const Invoice = require('../models/Invoice')

module.exports = {
    getNewInvoice: async (req,res) => {
        // Pull user setting so they can double check if their calendarId, rate, etc. are correct before creating the invoice - data will be rendered inside of a form
        try {
            res.render('newInvoice.ejs', { calenderId: req.user.lessonCalendarId, rate: req.user.hourlyRate })
        } catch(err) {
            console.error(err)
        }
    },
    createInvoice: async (req,res) => {
        try {
            const oauth2Client = new google.auth.OAuth2(
                process.env.GOOGLE_CLIENT_ID,
                process.env.GOOGLE_CLIENT_SECRET,
                '/auth/google/callback'
            )
        
            let pathToJSON = path.resolve(`./config/tokens/${req.user.googleId}_tokens.json`)
            const token = JSON.parse(fs.readFileSync(pathToJSON))
            oauth2Client.setCredentials(token)
    
            const calendar = google.calendar({version: 'v3', auth: oauth2Client})
    
            const data = await calendar.events.list({
                'calendarId': '6htkneqkhtqk335tlkccstau5o@group.calendar.google.com',
                'timeMin': (new Date()).toISOString(), 
                // 'timeMax': payPeriodEnd,
                'showDeleted': false,
                'singleEvents': true,
                'maxResults': 160, // for this use case, 160 results represents a 40 hours work week or 160 thirty minute events
                'orderBy': 'startTime'
            })
              console.log(data.data.items)

            const invoice = await Invoice.create({  
                // put settings from form here
            })
            res.json('Invoice Created')
            res.render('/invoice', { /* figure out how to pass newly created invoice to this path - invoice._id? */ })
        } catch (err) {
            console.error(err)
        }
        // need to pass setting from getNewInvoice into this function - use form
    },
}