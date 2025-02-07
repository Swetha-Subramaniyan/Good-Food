
// const { PrismaClient } = require('@prisma/client');
// const express = require('express');
// const { getPhoneNumber, createPhoneNumber } = require('../controllers/userAddress.controllers');
// const prisma = new PrismaClient();
// const router = express.Router();

// router.get('/getNo',getPhoneNumber)
// router.post('/createPhone',createPhoneNumber)

// module.exports = router;





const express = require('express');
const { getPhoneNumber, createAddress, getUserAddress } = require('../controllers/userAddress.controllers');
const router = express.Router();
 
router.get('/getNo',getPhoneNumber)
router.get('/getUser',getUserAddress)
router.post('/createPhone',createAddress)

 
module.exports = router;



