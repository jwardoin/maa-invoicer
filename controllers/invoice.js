const Invoice = require('./models/Invoice')

module.exports = {
    getInvoice: function(res,req) {
        try {
            const invoice = Invoice.find() // figure out how to find the specific invoice in DB 
            res.render('invoice.ejs', )    
        } catch (err) {
            console.error(err)
        }    
    },
}