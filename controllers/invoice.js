const Invoice = require('../models/Invoice')

module.exports = {
    getInvoice: (res,req) => {
        try {
            const invoice = Invoice.find() // figure out how to find the specific invoice in DB 
            res.render('invoice.ejs', { invoiceInfo: invoice })    
        } catch (err) {
            console.error(err)
        }    
    },
    deleteInvoice: (req,res) => {
        try {
            await Invoice.findOneAndDelete({ /* figure out best way to delete invoice user is currently looking at */ })
            res.redirect('/dashboard')
        } catch (err) {
            console.error(err)
        }
    }
}