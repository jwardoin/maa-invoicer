const User = require('../models/User');

module.exports = {
  changeSetting: async (googleId, settingName, settingValue) => {
    const allowedSettings = ['displayName', 'hourlyRate', 'lessonCalendarId'];
    try {
      if (!allowedSettings.includes(settingName))
        throw new Error('Not an allowed setting');
      return User.findOneAndUpdate(
        { googleId },
        { [settingName]: settingValue }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
      next(err);
    }
  },
};
