const express = require('express');
const {  getUserReport, getUserFoodReport } = require('../controllers/userFoodReport.controller');
const router = express.Router()

// router.post('/createReport',createUserFoodReport)
router.get('/getUserReport',getUserReport)
router.get('/getUserFoodReport',getUserFoodReport)


module.exports = router;