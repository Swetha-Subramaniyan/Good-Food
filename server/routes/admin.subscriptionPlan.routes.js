const express = require("express");
const {
  createSubscriptionPlan,
  getAllSubscriptionPlans,
  getSubscriptionPlanById,
  updateSubscriptionPlan,
  deleteSubscriptionPlan,
  getSubscriptionFormData,
  getFoodItemsByMealType,
  createSubscriptionWithFood,
} = require("../controllers/admin.subscriptionPlan.controller");
const router = express.Router();


router.get("/form-data", getSubscriptionFormData);

router.get("/food-items/meal-type/:mealTypeId", getFoodItemsByMealType);

router.post("/with-food", createSubscriptionWithFood);

router.post("/createplan", createSubscriptionPlan);

router.get("/getplan", getAllSubscriptionPlans);

router.get("/:id", getSubscriptionPlanById);

router.put("/:id", updateSubscriptionPlan);

router.delete("/:id", deleteSubscriptionPlan);

module.exports = router; 
