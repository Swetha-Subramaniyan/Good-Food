const express = require('express');
const { getAllFoodItems, createFoodItems } = require('../controllers/foodItems.controllers');
const router = express.Router();

router.get('/getFood',getAllFoodItems)
router.post('/createFood',createFoodItems)

module.exports = router;
