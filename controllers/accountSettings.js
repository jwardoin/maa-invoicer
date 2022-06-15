const User = require('../models/User')
const UserService = require('../services/user')

module.exports = {
    getSettings: (req,res) => {
        try {
            res.render('accountSettings.ejs', { accountSettings: req.user })
        } catch(err) {
            console.error(err)
        }
    },
    changeSetting: async (req,res) => {
            try {
                const { settingName, settingValue } = req.body
                await UserService.changeSetting(req.user.googleId, settingName, settingValue)
                res.json(`${settingName} changed to ${settingValue}`)
            } catch (err) {
                console.error(err)
            }
        },
    deleteAccount: async (req,res) => {
        try {
            await User.findOneAndDelete({  })
            res.redirect('/')
        } catch (err) {
            console.error(err)
        }
    }
}