const Invoice = require('../models/Invoice')

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
        try {
            res.render('dashboard.ejs', { user: req.user, invoice: invoices }) 
        } catch (err) {
            console.error(err)
        } 
    }

}