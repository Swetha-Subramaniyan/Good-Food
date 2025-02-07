const express = require('express');
const { createUserFoodReport, getUserReport } = require('../controllers/userFoodReport.controller');
const router = express.Router()

router.post('/createReport',createUserFoodReport)
router.get('/getUserReport',getUserReport)


module.exports = router;