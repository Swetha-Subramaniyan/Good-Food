const express = require('express');
const router = express.Router();
const smsController = require('../controllers/sms.controller');

router.post('/send-sms', smsController.sendSMS);

module.exports = router;
