const express = require('express');
const { getAllMealType, createMealType } = require('../controllers/mealType.controller');
const router = express.Router();


router.get('/getMealType', getAllMealType)
router.post('/createMeal', createMealType)

module.exports = router;