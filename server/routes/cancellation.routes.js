const express = require('express')
const { cancelSubscription  } = require('../controllers/cancellation.controller')
const router = express.Router()

// CANCELL SUBSCRIPTION BY USER
// METHOD : POST
router.post("/cancelSubscription", cancelSubscription);

module.exports = router; 