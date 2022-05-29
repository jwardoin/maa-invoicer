const User = require('../models/User')

module.exports = {
    getSettings: async (req,res) {
        try {
            const settings = User.find({ googleId: req.user.googleId })
            res.render('accountSettings.ejs', { accountSetting: settings })
        } catch(err) {
            console.error(err)
        }
    },
}