const express = require('express')
const router = express.Router()
const accountSettingsController = require('../controllers/accountSettings')
const { ensureAuth } = require('../middleware/auth')

router.put('/update', accountSettingsController.changeSetting)
router.delete('/deleteaccount', accountSettingsController.deleteAccount)

module.exports = router