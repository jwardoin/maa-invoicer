const User = require('../models/User');
const Invoice = require('../models/Invoice');
const UserService = require('../services/user');

module.exports = {
  changeSetting: async (req, res) => {
    try {
      const { settingName, settingValue } = req.body;
      await UserService.changeSetting(
        req.user.googleId,
        settingName,
        settingValue
      );
      res.json({
        msg: `${settingName} changed to ${settingValue} successfully`,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
  deleteAccount: async (req, res) => {
    try {
      await Invoice.deleteMany({ googleId: req.user.googleId });
      await User.findOneAndDelete({ googleId: req.user.googleId });
      req.logout();
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },
};
