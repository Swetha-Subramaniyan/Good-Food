const express = require('express');
const {  createSubscription, getSubscription, getSubscriptionNames, getSubscriptionById,  getMeals } = require('../controllers/subscription.controllers');
const router = express.Router();
 
router.get('/subscriptions/:id',getSubscriptionById)
router.get('/getSUB',getSubscription)
router.get('/names',getSubscriptionNames)
router.post('/createSub',createSubscription);
router.get('/getMeal/:planName/:mealType/:tier',getMeals)
 
module.exports = router;
