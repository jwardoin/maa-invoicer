const Invoice = require('../models/Invoice')

module.exports = {
    getDashboard: async (req,res) => {
        const invoices = await Invoice.find({ googleId: req.user.googleId })
        try {  
            res.json({
                invoices: invoices
            })
        } catch (err) {
            console.error(err)
            res.json('Failed to render dashboard')
        } 
    },
}