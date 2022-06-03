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