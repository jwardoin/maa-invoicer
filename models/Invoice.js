const mongoose = require('mongoose')

const InvoiceSchema = new mongoose.Schema({
    googleId: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    startDate: {
        type: Date,
        require: true
    },
    endDate: {
        type: Date,
        require: true
    },
    lessons: [{
        type: String,
        require: true
    }],
    totalPay: {
        type: Number,
        require: true
    },
})

module.exports = mongoose.model('Invoice', InvoiceSchema)