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