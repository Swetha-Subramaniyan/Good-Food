const express = require('express');
const { getAllSubscription, createSubscription } = require('../controllers/subscription.controllers');
const router = express.Router();

router.get('/getAllSub',getAllSubscription)
router.post('/createSub',createSubscription)

module.exports = router;