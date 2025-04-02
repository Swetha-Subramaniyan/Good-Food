const express = require('express')
const { createMealType,
    getAllMealTypes,
    getMealTypeById,
    updateMealType,
    deleteMealType, } = require('../controllers/admin.mealType.controller')
const router=express.Router()

router.post('/meal-types', createMealType);
router.get('/meal-types', getAllMealTypes);
router.get('/meal-types/:id', getMealTypeById);
router.put('/meal-types/:id', updateMealType);
router.delete('/meal-types/:id', deleteMealType);
module.exports = router;