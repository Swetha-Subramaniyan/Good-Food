const express = require('express')
const { createCart, getAllCarts } = require('../controllers/cart.controller')
const router = express.Router()

router.post('/newCart',createCart)
router.get('/get',getAllCarts)

module.exports = router;