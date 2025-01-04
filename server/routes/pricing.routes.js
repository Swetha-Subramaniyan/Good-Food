const express = require('express')
const { getPricingDetails, createPrice } = require('../controllers/pricing.controller')
const router = express.Router()

router.get('/getPrice',getPricingDetails)
router.post('/createPrice',createPrice)

module.exports = router;