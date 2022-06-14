const User = require('../models/User')

module.exports = {
    getSettings: (req,res) => {
        try {
            res.render('accountSettings.ejs', { accountSettings: req.user })
        } catch(err) {
            console.error(err)
        }
    },
    changeFirstName: async (req,res) => {
        try {
            await User.findOneAndUpdate({ googleId: req.user.googleId },{
                firstName: req.body.setting
            })
            res.json('First Name changed')
        } catch (err) {
            console.error(err)
        }
    },
    changeLastName: async (req,res) => {
        try {
            await User.findOneAndUpdate({ googleId: req.user.googleId },{
                lastName: req.body.setting
            })
            res.json('Last Name changed')
        } catch (err) {
            console.error(err)
        }
    },
    changeRate: async (req,res) => {
        try {
            await User.findOneAndUpdate({ googleId: req.user.googleId },{
                hourlyRate: req.body.setting
            })
            res.json('Rate changed')
        } catch (err) {
            console.error(err)
        }
    },
    changeCalendarId: async (req,res) => {
        try {
            await User.findOneAndUpdate({ googleId: req.user.googleId },{
                lessonCalendarId: req.body.setting
            })
            res.json('Calendar ID changed')
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