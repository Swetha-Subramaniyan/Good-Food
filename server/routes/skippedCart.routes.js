const express = require('express')
const { skipCart, getSkippedMeals, reorderSkippedItem  } = require('../controllers/skippedCart.controller')
const router = express.Router()

// SEND EMAIL ON SUCESSFULL ADDRESS UPDATE
// METHOD : POST
router.post("/skipCartItem", skipCart);

router.get("/getSkippedMeals", getSkippedMeals);

router.post("/reorderSkippedItem", reorderSkippedItem);

module.exports = router; 