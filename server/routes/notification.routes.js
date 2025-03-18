const express = require('express')
const { sendEmailOnUserAddressUpdate, sendEmailOnUserMultipleAddressUpdate, sendNotificationOnSubscription, sendNotificationOnOrderProcessing } = require('../controllers/notification.controller')
const router = express.Router()

// SEND EMAIL ON SUCESSFULL ADDRESS UPDATE
// METHOD : POST
router.post("/sendEmailOnUserAddressUpdate", sendEmailOnUserAddressUpdate);


// SEND EMAIL ON SUCESSFULLY ADDING MORE THAN ONE ADDRESS UPDATE
// METHOD : POST
router.post("/sendEmailOnUserMultipleAddressUpdate", sendEmailOnUserMultipleAddressUpdate);

// SEND EMAIL ON SUCESSFULL SUBSCRIPTION
// METHOD : POST
router.post("/sendNotificationOnSubscription", sendNotificationOnSubscription);


// SEND EMAIL ON SUCESSFULL ORDER TRIGGEIRNG FOR SUBSCRIPTION PLANS (SCHEDULED ORDER CRON FOR SUBSCRIPTION)
// METHOD : POST
router.post("/sendNotificationOnOrderProcessing", sendNotificationOnOrderProcessing);


module.exports = router; 