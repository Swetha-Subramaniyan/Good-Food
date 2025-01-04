const express = require('express')
const { getTier, createTier } = require('../controllers/tier.controllers')
const router = express.Router()

router.get('/getTier',getTier)
router.post('/createTier',createTier)


module.exports = router;