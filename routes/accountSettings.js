const express = require('express')
const router = express.Router()
const accountSettingsController = require('../controllers/accountSettings')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, accountSettingsController.getSettings)
router.put('/update', accountSettingsController.changeSetting)
router.delete('/deleteAccount', accountSettingsController.deleteAccount)

module.exports = router