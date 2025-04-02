const express = require("express");
const {
  createParentPlan,
  getAllParentPlans,
  getParentPlanById,
  updateParentPlan,
  deleteParentPlan,
} = require("../controllers/admin.parentPlan.controller");

const router = express.Router();

router.post('/createplan', createParentPlan);
router.get('/getplan', getAllParentPlans);
router.get('/:id', getParentPlanById);
router.put('/:id', updateParentPlan);
router.delete('/:id', deleteParentPlan);

module.exports = router;
