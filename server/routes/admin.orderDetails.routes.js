const express = require('express')
const { getOrderDetails, verifyUserPosition, updateOrderStatus } = require('../controllers/admin.ordersDetails.controller')

const upload = require('../utils/multer.utils');

const router=express.Router();

router.get('/getOrderDetails',getOrderDetails);
router.get('/verifyUserPosition',verifyUserPosition);
router.post('/updateOrderStatus', upload.single('image'), updateOrderStatus);

module.exports = router;