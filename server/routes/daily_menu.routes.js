const express=require('express')
const { createPeriodical, createDailyMenu, getMenuwithPeriod } = require('../controllers/daily_menu.controller')
const router = express.Router()

router.post('/createPeriod',createPeriodical)
router.post('/createDaily',createDailyMenu)
router.get('/getMenuWithPeriod',getMenuwithPeriod)


module.exports=router; 