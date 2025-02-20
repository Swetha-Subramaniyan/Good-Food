const express = require("express");
const { getKey, createOrderAndSubscription } = require("../controllers/paymentController");
const router = express.Router();

router.post("/razorPay", createOrderAndSubscription);
router.get('/getKey',getKey)

module.exports = router;
