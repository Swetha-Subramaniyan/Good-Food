const express = require('express')
const { getOrderDetails, verifyUserPosition } = require('../controllers/admin.ordersDetails.controller')
const router=express.Router()

router.get('/getOrderDetails',getOrderDetails);
router.get('/verifyUserPosition',verifyUserPosition)

module.exports = router;