const express = require('express')
const { skipCart  } = require('../controllers/skippedCart.controller')
const router = express.Router()

// SEND EMAIL ON SUCESSFULL ADDRESS UPDATE
// METHOD : POST
router.post("/skipCartItem", skipCart);

module.exports = router; 