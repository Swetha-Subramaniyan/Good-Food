const express = require('express');
const { getPhoneNumber, createAddress, getUserAddress } = require('../controllers/userAddress.controllers');
const router = express.Router();

router.get('/getNo',getPhoneNumber)
router.get('/getUser',getUserAddress)
router.post('/createPhone',createAddress)

module.exports = router;