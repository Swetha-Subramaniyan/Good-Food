const express = require('express');
const { getAllSubscription, createSubscription, getSubscription, getSubscriptionNames, getSubscriptionById, sendNotificationOnSubscription } = require('../controllers/subscription.controllers');
const router = express.Router();

router.get('/subscriptions/:id',getSubscriptionById)
router.get('/getSUB',getSubscription)
router.get('/names',getSubscriptionNames)
router.post('/createSub',createSubscription);


// SEND EMAIL ON SUCESSFULL SUBSCRIPTION
// METHOD : GET
router.get("/sendNotificationOnSubscription", sendNotificationOnSubscription);

module.exports = router;

