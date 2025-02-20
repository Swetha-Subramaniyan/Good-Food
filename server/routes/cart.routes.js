const express = require('express')
const { createCart, getAllCarts, removeCartItem } = require('../controllers/cart.controller')
const router = express.Router()

router.post('/newCart',createCart)
router.get('/get',getAllCarts)
router.delete('/removeCart/:foodItemId',removeCartItem)

module.exports = router;