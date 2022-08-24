const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  lessonCalendarId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  googleCalendarIds: [
    [
      {
        type: String,
        required: true,
      },
    ],
  ],
});

module.exports = mongoose.model('User', UserSchema);
