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
        const invoices = await Invoice.find({ googleId: req.user.googleId })
        const invoiceCount = await Invoice.countDocuments({ googleId: req.user.googleId })
        try {  
            res.json({
                invoices: invoices,
                invoiceCount: invoiceCount
            })
            // res.render('dashboard.ejs', { user: req.user, invoice: invoices, invoiceCount: invoiceCount }) 
        } catch (err) {
            console.error(err)
        } 
    },
    deleteInvoice: async (req,res) => {
        try {
            await Invoice.findOneAndDelete({ _id: req.body.invoiceIdFromFile })
            res.redirect('/dashboard')
        } catch (err) {
            console.error(err)
        }
    }
}