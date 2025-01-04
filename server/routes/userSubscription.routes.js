const express = require('express');
const { getUserSubscription, createUserSubscription } = require('../controllers/userSubscription.controller');
const router = express.Router();


router.get('/getUserSubscription',getUserSubscription)
router.post('/createUserSubscription',createUserSubscription)

module.exports = router;