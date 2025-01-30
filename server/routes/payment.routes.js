const express = require("express");
const { createOrder, getKey } = require("../controllers/paymentController");
const router = express.Router();

router.post("/razorPay", createOrder);
router.get('/getKey',getKey)

module.exports = router;
