const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    hourlyRate: {
        type: Number,
        required: true
    },
    lessonCalendarId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // I would like to store all of the user's Google Calendar IDs in their profile, so there will be no need to call the API again later when editing settings
    // googleCalendarIds: [{
    //     type: String,
    //     required: true
    // }]
})

module.exports = mongoose.model('User', UserSchema)