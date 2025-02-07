// const express = require('express')
// const { getOrders, createOrders } = require('../controllers/orders.controller')
// const router = express.Router()

// router.get('/getAllOrder',getOrders)
// router.post('/newOrder',createOrders)


// module.exports = router;



const express = require("express");
const { addOrderItems } = require("../controllers/orderItem.controller");
const { createOrder } = require("../controllers/orders.controller");
const router = express.Router();

router.post('/create',createOrder)
router.post("/addOrderItems", addOrderItems); 

module.exports = router;
