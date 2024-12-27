const express = require('express')
const { PrismaClient } = require('@prisma/client');
const { getAllPhoneNumber, createPhoneNumber } = require('../controllers/phone.controller');
const router = express.Router();


router.get('/getPhone',getAllPhoneNumber)
router.post('/createPhone',createPhoneNumber)

module.exports = router;

