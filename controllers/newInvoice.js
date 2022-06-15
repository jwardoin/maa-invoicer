const Invoice = require('../models/Invoice')
const { google } = require('googleapis')
const path = require('path')
const fs = require('fs')

module.exports = {
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
            
            // Data to pass into Google API call
            const calendarId = req.user.lessonCalendarId
            const payPeriodStart = new Date('00:00:00 ' + req.body.payPeriodStart).toISOString()
            const payPeriodEnd = new Date('23:59:59 ' + req.body.payPeriodEnd).toISOString()

            const data = await calendar.events.list({
                'calendarId': calendarId,
                'timeMin': payPeriodStart, 
                'timeMax': payPeriodEnd,
                'showDeleted': false,
                'singleEvents': true,
                'maxResults': 160, // for this use case, 160 results represents a 40 hours work week or 160 thirty minute events
                'orderBy': 'startTime'
            })
            //   console.log(data.data.items)

            // Data for new invoice
            const exclusionKeywords = ['off','makeup','break']

            function getPayableEvents() {
                const removeNoPayEvents = data.data.items.filter(event => !exclusionKeywords.some(keyword => event.summary.toLowerCase().includes(keyword)))
                function parseTime(startTime, endTime) {
                    return (new Date(endTime).getTime() - new Date(startTime).getTime()) / 3600000
                }
                const payableEvents = removeNoPayEvents.map(event => {
                    return [event.summary, parseTime(event.start.dateTime, event.end.dateTime)]
                })
                return payableEvents
            }

            const eventList = getPayableEvents()
            const totalHours = eventList.reduce((a,b)=> a + b[1], 0)
            const totalPay = totalHours * req.user.hourlyRate

            const newInvoice = {
                googleId: req.user.googleId,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                startDate: new Date(req.body.payPeriodStart),
                endDate: new Date(req.body.payPeriodEnd),
                lessons: eventList,
                totalHours: totalHours,
                totalPay: totalPay,
                hourlyRate: req.user.hourlyRate
            }
            

            const invoice = await Invoice.create(newInvoice)
            res.json('Invoice Created')
            res.redirect('/')
        } catch (err) {
            console.error(err)
        }
        // need to pass setting from getNewInvoice into this function - use form
    },
}