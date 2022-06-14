const Invoice = require('../models/Invoice')
const fs = require('fs')
const path = require('path')
const { google } = require('googleapis')

module.exports = {
    getLogin: (req,res) => {
        try {
            res.render('login.ejs') 
        } catch (err) {
            console.error(err)
        } 
    },
    getDashboard: async (req,res) => {
        
        // getCalendar.getCalendar()

        // const data = await calendar.events.list({
        //     'calendarId': '6htkneqkhtqk335tlkccstau5o@group.calendar.google.com',
        //     'timeMin': (new Date()).toISOString(), 
        //     // 'timeMax': payPeriodEnd,
        //     'showDeleted': false,
        //     'singleEvents': true,
        //     'maxResults': 10, // for this use case, 160 results represents a 40 hours work week or 160 thirty minute events
        //     'orderBy': 'startTime'
        // })
        //   console.log(data.data.items)
 
        const invoices = await Invoice.find({ googleId: req.user.googleId })
        const invoiceCount = await Invoice.countDocuments()
        try {  
            res.render('dashboard.ejs', { user: req.user, invoice: invoices, invoiceCount: invoiceCount }) 
        } catch (err) {
            console.error(err)
        } 
    }

}