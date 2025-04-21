const express = require('express')
const { createFoodItem,
    getAllFoodItems,
    getFoodItemById,
    updateFoodItem,
    deleteFoodItem, } = require('../controllers/admin.foodItems.controller');
const upload = require('../utils/multer.utils');

const router=express.Router()

router.post('/createFoodItem', upload.single('image'), createFoodItem);
router.get('/getFoodItem', getAllFoodItems);
router.get('/:id', getFoodItemById);
router.put('/:id', upload.single('image'),  updateFoodItem);
router.delete('/:id', deleteFoodItem);
module.exports = router;