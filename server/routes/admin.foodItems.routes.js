const express = require('express')
const { createFoodItem,
    getAllFoodItems,
    getFoodItemById,
    updateFoodItem,
    deleteFoodItem, } = require('../controllers/admin.foodItems.controller')
const router=express.Router()

router.post('/createFoodItem', createFoodItem);
router.get('/getFoodItem', getAllFoodItems);
router.get('/:id', getFoodItemById);
router.put('/:id', updateFoodItem);
router.delete('/:id', deleteFoodItem);
module.exports = router;