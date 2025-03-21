const express = require('express')
const { createAdditionalFoodItems, getAllAdditionalItems } = require('../controllers/additionalItems.controller')
const router=express.Router()

router.post('/additional',createAdditionalFoodItems)
router.get('/getAllAdditional',getAllAdditionalItems)

module.exports = router;