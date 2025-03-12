const express = require('express');
const {  getUserReport } = require('../controllers/userFoodReport.controller');
const router = express.Router()

// router.post('/createReport',createUserFoodReport)
router.get('/getUserReport',getUserReport)


module.exports = router;