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
        type: String,
        require: true
    },
    endDate: {
        type: String,
        require: true
    },
    lessons: [
        [
            {
            type: String,
            require: true
            }
        ]
    ],
    totalHours: {
        type: Number,
        required: true
    },
    totalPay: {
        type: Number,
        require: true
    },
    hourlyRate: {
        type: Number,
        required: true
    },
    holidays: [{Number}]
})

module.exports = mongoose.model('Invoice', InvoiceSchema)