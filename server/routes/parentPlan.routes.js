const express = require('express');
const { getParentPlans, createParentPlan } = require('../controllers/parentPlan.controller');

const router = express.Router();


router.get('/getPlan',getParentPlans)
router.post('/createPlan',createParentPlan)

module.exports = router;