const express = require('express')
const { getSubscriptionOrders, createSubscriptionOrders } = require('../controllers/subscriptionOrder.controller')
const router = express.Router()

router.get('/getOrder',getSubscriptionOrders)
router.post('/createOrder',createSubscriptionOrders)


module.exports = router; 