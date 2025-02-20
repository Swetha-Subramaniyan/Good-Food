// const express = require('express');
// const { getUserSubscription, createUserSubscription } = require('../controllers/userSubscription.controller');
// const router = express.Router();


// router.get('/getUserSubscription',getUserSubscription)
// router.post('/createUserSubscription',createUserSubscription)

// module.exports = router;



const express = require('express');
const { getUserSubscription, getUserSubscriptionDetails, getMenuWithSubID } = require('../controllers/userSubscription.controller');
const router = express.Router();
 
 
router.get('/getUserSubscription',getUserSubscription)
router.get('/getUserDetails',getUserSubscriptionDetails)
router.get('/getFoodWithID/:id',getMenuWithSubID)
// router.post('/createUserSubscription',createUserSubscription)
 
module.exports = router;