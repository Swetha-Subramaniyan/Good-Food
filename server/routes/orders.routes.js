const express=require('express')
const { createOrder, getAllOrders, updateOrder } = require('../controllers/orders.controller')
const { addOrderItem } = require('../controllers/orderItem.controller')
const { getOrderCriteria, createOrderCriteria } = require('../controllers/orderCriteria.controller')
const router=express.Router()


router.post('/create-order',createOrder)
router.get('/orders',getAllOrders)
router.post('/add-item',addOrderItem)
router.get('/criteria',getOrderCriteria)
router.post('/criteria',createOrderCriteria)
router.put('/update',updateOrder)

module.exports=router;
