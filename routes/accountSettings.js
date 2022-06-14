const express = require('express')
const router = express.Router()
const accountSettingsController = require('../controllers/accountSettings')

router.get('/', accountSettingsController.getSettings)
router.put('/firstName', accountSettingsController.changeFirstName)
router.put('/lastName', accountSettingsController.changeLastName)
router.put('/hourlyRate', accountSettingsController.changeRate)
router.put('/lessonCalendarId', accountSettingsController.changeCalendarId)
router.delete('/deleteAccount', accountSettingsController.deleteAccount)

module.exports = router