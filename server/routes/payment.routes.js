const express = require("express");
const {  createOrderAndSubscription, getKey, updatePaymentStatus, getPaymentDetails } = require("../controllers/paymentController");
const router = express.Router();

router.post("/razorPay", createOrderAndSubscription);
router.get('/getKey',getKey)


router.post('/update',updatePaymentStatus)
router.get('/details/:payment_id',getPaymentDetails)

module.exports = router;



