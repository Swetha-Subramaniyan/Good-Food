const express = require('express')
const { getAllMenu, createMenu, getFoodMenuWithSubId } = require('../controllers/subscriptionFoodMenu.controller')
const router = express.Router()


router.get('/getMenu',getAllMenu)
router.post('/getWithID',getFoodMenuWithSubId)
router.post('/createMenu',createMenu)

module.exports = router;







