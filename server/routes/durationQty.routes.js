const express = require('express')
const { getDurationQuty, createDurationQty } = require('../controllers/durationQty.controller')
const router = express.Router()


router.get('/getDays',getDurationQuty)
router.post('/createQty',createDurationQty)

module.exports = router;