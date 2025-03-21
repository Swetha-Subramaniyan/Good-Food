const express=require('express')
const { createPeriodical, createDailyMenu, getMenuwithPeriod, getAllMenu } = require('../controllers/daily_menu.controller')
const router = express.Router()

router.post('/createPeriod',createPeriodical)
router.post('/createDaily',createDailyMenu)
router.get('/getMenuWithPeriod',getMenuwithPeriod)
router.get('/All',getAllMenu)


module.exports=router; 