
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
 
const getSubscriptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await prisma.subscription.findUnique({
      where: { id: parseInt(id) },
 
      include: {
        parentPlan1: { select: { plan_name: true } },
        DurationSub: { select: { quantity: true } },
        DurationSubs: {
          select: {
            actual_days: true,
            addon_days: true,
          },
        },
        MealSub: { select: { meal_type: true } },
        PricingDetails: { select: { price: true } },
        TierSub: { select: { type: true } },
      },
    });
 
    res
      .status(200)
      .json({ message: "Subscription details fetched", subscription });
  } catch (error) {
    console.error("Error fetching subscription by ID:", error);
    res.status(500).json({ error: "Failed to fetch subscription details" });
  }
};
 
const getSubscription = async (req, res) => {
  try {
    const getSUB = await prisma.subscription.findMany({
      include: {
        parentPlan1: true,
        SubscriptionPayments: true,
      },
    });
    res.status(200).json({ message: "Subscription found", getSUB });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Subscriptions not found " });
  }
};
 
const getSubscriptionNames = async (req, res) => {
  try {
    const getSUB = await prisma.subscription.findMany({
      include: {
        parentPlan1: { select: { plan_name: true } },
        TierSub: { select: { type: true } },
        DurationSubs: { select: { actual_days: true, addon_days: true } },
        MealSub: { select: { meal_type: true } },
        PricingDetails: { select: { price: true } },
      },
    });
 
    // Restructuring the response
    const formattedSubscriptions = getSUB.reduce((acc, sub) => {
      const planName = sub.parentPlan1.plan_name;
      const tierType = sub.TierSub.type;
      const mealType = sub.MealSub.meal_type;
 
      if (!acc[planName]) {
        acc[planName] = {};
      }
 
      if (!acc[planName][tierType]) {
        acc[planName][tierType] = {};
      }
 
      if (!acc[planName][tierType][mealType]) {
        acc[planName][tierType][mealType] = [];
      }
 
      acc[planName][tierType][mealType].push({
        id: sub.id,
        days: sub.DurationSubs?.actual_days || "N/A",
        price: sub.PricingDetails?.price || "N/A",
      });
 
      return acc;
    }, {});
 
    res.status(200).json({ message: "Subscription found", formattedSubscriptions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching subscriptions" })
  }
};
 

 
// const getMeals = async (req, res) => {
//   try {
//     const { planName, mealType, tier } = req.params;
 
//     // Fetch subscriptions that match the criteria
//     const subscriptions = await prisma.subscription.findMany({
//       where: {
//         parentPlan1: {
//           plan_name: planName
//         },
//         MealSub: {
//           meal_type: mealType
//         },
//         TierSub: {
//           type: tier
//         }
//       },
//       include: {
//         FoodSubscription: {
//           include: {
//             FoodItems: true
//           }
//         }
//       }
//     });
 
 
//     // Extract unique food items using a Set
//     const foodItems = new Map();
 
//     subscriptions.forEach((sub) => {
//       sub.FoodSubscription.forEach((menu) => {
//         foodItems.set(menu.FoodItems.id, menu.FoodItems);
//       });
//     });
 
//     res.status(200).json({ success: true, foodItems: Array.from(foodItems.values()) });
//   } catch (error) {
//     console.error("Error fetching meals:", error);
//     res.status(500).json({ success: false, message: "Error fetching meals." });
//   }
// };
 

const getMealsWithDailyMenu = async (req, res) => {
  try {
    const { planName, mealType, tier } = req.params;

    const subscriptions = await prisma.subscription.findMany({
      where: {
        parentPlan1: { plan_name: planName },
        MealSub: { meal_type: mealType },
        TierSub: { type: tier }
      },
      include: {
        FoodSubscription: {
          include: { FoodItems: true }
        }
      }
    });

    // Extract unique food items using a Map
    const foodItems = new Map();
    subscriptions.forEach((sub) => {
      sub.FoodSubscription.forEach((menu) => {
        foodItems.set(menu.FoodItems.id, menu.FoodItems);
      });
    });

    // Fetch daily menus
    const getDaily = await prisma.daily_Menu.findMany({
      where: {
        subFoodMenuu: {
          FoodSubscription: {
            parentPlan1: { plan_name: planName },
            MealSub: { meal_type: mealType },
            TierSub: { type: tier }
          }
        }
      },
      select: {
        periods: { select: { period: true } },
        subFoodMenuu: {
          select: {
            id: true,
            food_item_id: true,
            FoodItems: { select: { item_name: true, image_url: true } },
            meal_type_id: true,
            mealType: { select: { meal_type: true } },
            FoodSubscription: {
              select: {
                parentPlan1: { select: { id: true, plan_name: true } },
                TierSub: { select: { id: true, type: true } }
              }
            }
          }
        }
      }
    });

const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Initialize the formattedMenu object with all days
const formattedMenu = allDays.reduce((acc, day) => {
  acc[day] = {}; // Ensure each day exists
  return acc;
}, {});

getDaily.forEach((item) => {
  const day = item.periods?.period || "Uncategorized";
  const mealType = item.subFoodMenuu.mealType.meal_type || "Other";
  const foodName = item.subFoodMenuu.FoodItems.item_name;
  const image = item.subFoodMenuu.FoodItems.image_url;
  const plan_id = item.subFoodMenuu.FoodSubscription.parentPlan1.id;
  const plan_name = item.subFoodMenuu.FoodSubscription.parentPlan1.plan_name;
  const tierId = item.subFoodMenuu.FoodSubscription.TierSub.id;
  const tier = item.subFoodMenuu.FoodSubscription.TierSub.type;

  if (!formattedMenu[day]) formattedMenu[day] = {}; // Ensure day exists
  if (!formattedMenu[day][mealType]) formattedMenu[day][mealType] = [];

  formattedMenu[day][mealType].push({
    food_name: foodName,
    parent_plan_id: plan_id,
    plan_name: plan_name,
    tier_id: tierId,
    tier: tier,
    meal_type_id: item.subFoodMenuu.meal_type_id,
    meal_type: item.subFoodMenuu.mealType.meal_type,
    image: image
  });
});


     

    res.status(200).json({
      success: true,
      foodItems: Array.from(foodItems.values()),
      formattedMenu
    });

  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).json({ success: false, message: "Error fetching meals." });
  }
};

 
 
 
const createSubscription = async (req, res) => {
  try {
    const {
      parent_plan_id,
      plan_description,
      duration_id,
      quantity_id,
      tier_id,
      meal_type_id,
      price_id,
    } = req.body;
 
    const createSubs = await prisma.subscription.create({
      data: {
        parent_plan_id,
        plan_description,
        tier_id,
        duration_id,
        quantity_id,
        meal_type_id,
        price_id,
        created_at: new Date(),
        updatedAt: new Date(),
      },
    });
 
    res
      .status(200)
      .json({ message: "Successfully created subscription", createSubs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create subscription" });
  }
};
 
 
 
module.exports = {
  getSubscriptionById,
  getSubscriptionNames,
  getSubscription,
  createSubscription,
  // getMeals
  getMealsWithDailyMenu
};