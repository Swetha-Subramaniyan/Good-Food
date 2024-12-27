const { PrismaClient } = require('@prisma/client');
const express = require('express');
const { getPhoneNumber, createPhoneNumber } = require('../controllers/userAddress.controllers');
const prisma = new PrismaClient();
const router = express.Router();

router.get('/getNo',getPhoneNumber)
router.post('/createPhone',createPhoneNumber)

module.exports = router;