const express = require('express');
const { getSubscriptionPayment, createSubscriptionPayment } = require('../controllers/subscriptionPayment.controller');
const router = express.Router()

router.get('/getPayment',getSubscriptionPayment)
router.post('/createPayment',createSubscriptionPayment)

module.exports = router;