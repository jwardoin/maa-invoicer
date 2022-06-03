const express = require('express')
const router = express.Router()
const accountSettingsController = require('../controllers/accountSettings')

router.get('/', accountSettingsController.getSettings)
router.put('/update', accountSettingsController.changeSetting)
router.delete('/deleteAccount', accountSettingsController.deleteAccount)

module.exports = router