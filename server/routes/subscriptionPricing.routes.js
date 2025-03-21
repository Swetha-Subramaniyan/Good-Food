const express = require('express');
const { getSubscriptionPricing, createSubscriptionPricing, getPaymentProcess } = require('../controllers/subscriptionPricing.controller');
const router = express.Router()


router.get('/getPrice',getSubscriptionPricing)
router.get('/getAmnt',getPaymentProcess)
router.post('/createPrice',createSubscriptionPricing)

module.exports = router;