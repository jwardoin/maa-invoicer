const User = require('../models/User')

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
            await User.findOneAndUpdate({ /* figure out how to send setting that needs to be updated */ })
            res.redirect('/accountSettings')
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