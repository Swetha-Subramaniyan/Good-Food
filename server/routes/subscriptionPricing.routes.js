const express = require('express');
const { getSubscriptionPricing, createSubscriptionPricing } = require('../controllers/subscriptionPricing.controller');
const router = express.Router()


router.get('/getPrice',getSubscriptionPricing)
router.post('/createPrice',createSubscriptionPricing)

module.exports = router;