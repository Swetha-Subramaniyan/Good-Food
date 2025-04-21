const express = require('express')
const { cancelSubscription, checkCancellationStatus, updateCancellationStatus, getCancelledSubscriptions  } = require('../controllers/cancellation.controller')
const router = express.Router()

router.get('/cancelled-subscriptions', getCancelledSubscriptions);

// CANCELL SUBSCRIPTION BY USER
// METHOD : POST
router.post("/cancelSubscription", cancelSubscription);

router.get("/checkCancellationStatus/:user_subscription_id", checkCancellationStatus);

router.put("/updateCancellationStatus/:user_subscription_id", updateCancellationStatus);

module.exports = router; 