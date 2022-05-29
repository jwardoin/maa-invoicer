const express = require('express')
const router = express.Router()
const accountSettingsController = require('../controllers/accountSettings')

router.get('/', accountSettingsController.getSettings)

module.exports = router