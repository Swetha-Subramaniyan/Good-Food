const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getSubscriptionFormData = async (req, res) => {
  try {
    const parentPlans = await prisma.Parent_Plan.findMany();
    const mealTypes = await prisma.Meal_type.findMany();
    const durations = await prisma.Duration.findMany();
    const quantities = await prisma.Quantity.findMany();
    const tiers = await prisma.Tier.findMany();
    
    res.json({
      parentPlans,
      mealTypes,
      durations,
      quantities,
      tiers
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFoodItemsByMealType = async (req, res) => {
  try {
    const { mealTypeId } = req.params;
    
    const foodItems = await prisma.food_Items.findMany({
      where: {
        FoodItemsMenu: {
          some: {
            meal_type_id: parseInt(mealTypeId)
          }
        }
      },
      include: {
        SubscriptionPriceDetails: true
      }
    });
    
    res.json(foodItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSubscriptionWithFood = async (req, res) => {
  try {
    const {
      parent_plan_id,
      plan_description,
      tier_id,
      duration_id,
      quantity_id,
      meal_type_id,
      price,
      food_items
    } = req.body;
    
    const pricingDetails = await prisma.pricing_Details.create({
      data: {
        price: parseFloat(price),
      },
    });
    
    const subscription = await prisma.subscription.create({
      data: {
        parent_plan_id: parseInt(parent_plan_id),
        plan_description,
        tier_id: parseInt(tier_id),
        duration_id: parseInt(duration_id),
        quantity_id: parseInt(quantity_id),
        meal_type_id: parseInt(meal_type_id),
        price_id: pricingDetails.id,
      },
    });
    
    if (food_items && food_items.length > 0) {
      await Promise.all(
        food_items.map(async (foodItemId) => {
          await prisma.subscription_Food_Menu.create({
            data: {
              subscription_id: subscription.id,
              food_item_id: parseInt(foodItemId),
              meal_type_id: parseInt(meal_type_id),
            },
          });
        })
      );
    }
    
    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const createSubscriptionPlan = async (req, res) => {
  try {
    const {
      parent_plan_id,
      plan_description,
      tier_id,
      duration_id,
      quantity_id,
      meal_type_id,
      price,
      food_items,  
    } = req.body;
    
    const pricingDetails = await prisma.pricing_Details.create({
      data: {
        price: parseFloat(price),
      },
    });
    
    const subscription = await prisma.subscription.create({
      data: {
        parent_plan_id: parseInt(parent_plan_id),
        plan_description,
        tier_id: parseInt(tier_id),
        duration_id: parseInt(duration_id),
        quantity_id: parseInt(quantity_id),
        meal_type_id: parseInt(meal_type_id),
        price_id: pricingDetails.id,
      },
    });
    
    if (food_items && food_items.length > 0) {
      await Promise.all(
        food_items.map(async (foodItemId) => {
          await prisma.subscription_Food_Menu.create({
            data: {
              subscription_id: subscription.id,
              food_item_id: parseInt(foodItemId),
              meal_type_id: parseInt(meal_type_id),
            },
          });
        })
      );
    }
    
    const subscriptionWithFoodItems = await prisma.subscription.findUnique({
      where: { id: subscription.id },
      include: {
        FoodSubscription: {
          include: {
            FoodItems: true,
          },
        },
        parentPlan1: true,
        TierSub: true,
        DurationSub: true,
        DurationSubs: true,
        MealSub: true,
        PricingDetails: true,
      },
    });
    
    res.status(201).json(subscriptionWithFoodItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllSubscriptionPlans = async (req, res) => {
  try {
    const subscriptions = await prisma.subscription.findMany({
      include: {
        FoodSubscription: {
          include: {
            FoodItems: true,
          },
        },
        parentPlan1: true,
        TierSub: true,
        DurationSub: true,
        DurationSubs: true,
        MealSub: true,
        PricingDetails: true,
      },
    });
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSubscriptionPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const subscription = await prisma.subscription.findUnique({
      where: { id: parseInt(id) },
      include: {
        FoodSubscription: {
          include: {
            FoodItems: true,
          },
        },
        parentPlan1: true,
        TierSub: true,
        DurationSub: true,
        DurationSubs: true,
        MealSub: true,
        PricingDetails: true,
        SubscriptionPayments: true,
        Subscription: true,
        SubscriptionPricing: true,
        Subscriptions: true,
        SubscriptionOrders: true,
      },
    });
    
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription plan not found' });
    }
    
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSubscriptionPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      parent_plan_id,
      plan_description,
      tier_id,
      duration_id,
      quantity_id,
      meal_type_id,
      price,
      food_items,
    } = req.body;
    
    const subscription = await prisma.subscription.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription plan not found' });
    }
    
    await prisma.pricing_Details.update({
      where: { id: subscription.price_id },
      data: {
        price: parseFloat(price),
      },
    });
    
    const updatedSubscription = await prisma.subscription.update({
      where: { id: parseInt(id) },
      data: {
        parent_plan_id: parseInt(parent_plan_id),
        plan_description,
        tier_id: parseInt(tier_id),
        duration_id: parseInt(duration_id),
        quantity_id: parseInt(quantity_id),
        meal_type_id: parseInt(meal_type_id),
      },
    });
    
    if (food_items) {
      await prisma.subscription_Food_Menu.deleteMany({
        where: { subscription_id: parseInt(id) },
      });
      
      await Promise.all(
        food_items.map(async (foodItemId) => {
          await prisma.subscription_Food_Menu.create({
            data: {
              subscription_id: parseInt(id),
              food_item_id: parseInt(foodItemId),
              meal_type_id: parseInt(meal_type_id),
            },
          });
        })
      );
    }
    
    const subscriptionWithFoodItems = await prisma.subscription.findUnique({
      where: { id: parseInt(id) },
      include: {
        FoodSubscription: {
          include: {
            FoodItems: true,
          },
        },
        parentPlan1: true,
        TierSub: true,
        DurationSub: true,
        DurationSubs: true,
        MealSub: true,
        PricingDetails: true,
      },
    });
    
    res.json(subscriptionWithFoodItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSubscriptionPlan = async (req, res) => {
  try {
    const { id } = req.params;
    
    const subscription = await prisma.subscription.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription plan not found' });
    }
    
    await prisma.subscription_Food_Menu.deleteMany({
      where: { subscription_id: parseInt(id) },
    });
    
    await prisma.subscription.delete({
      where: { id: parseInt(id) },
    });
    
    await prisma.pricing_Details.delete({
      where: { id: subscription.price_id },
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSubscriptionPlan,
  getAllSubscriptionPlans,
  getSubscriptionPlanById,
  updateSubscriptionPlan,
  deleteSubscriptionPlan,
  getSubscriptionFormData,
  getFoodItemsByMealType,
  createSubscriptionWithFood,
};