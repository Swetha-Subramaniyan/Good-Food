const express = require('express')
const { skipCart, getSkippedMeals, reorderSkippedItem, getSkipCriteria  } = require('../controllers/skippedCart.controller')
const router = express.Router()



router.get("/getSkipCriteria", getSkipCriteria);

// SEND EMAIL ON SUCESSFULL ADDRESS UPDATE
// METHOD : POST
router.post("/skipCartItem", skipCart);

router.get("/getSkippedMeals", getSkippedMeals);

router.post("/reorderSkippedItem", reorderSkippedItem);

module.exports = router; 