const { PrismaClient } = require("@prisma/client");
const express = require("express");
const prisma = new PrismaClient();

const skipCart = async (req, res) => {
  const { skipped_meal_item_ids, user_subscription_id, skip_date } = req.body;
  const { user_id } = req.user;

  try {
    if (!Array.isArray(skipped_meal_item_ids) || skipped_meal_item_ids.length === 0) {
      return res.status(400).json({ error: "Invalid or empty meal items array" });
    }

    const userSubscription = await prisma.user_Subscription.findUnique({
      where: { id: user_subscription_id },
      include: {
        Subscription: {
          include: {
            DurationSubs: true,
            MealSub: true,
            FoodSubscription: {
              include: {
                FoodItems: true,
              },
            },
            parentPlan1: true,
          },
        },
      },
    });

    if (!userSubscription) {
      return res.status(202).json({ error: "User subscription not found" });
    }

    const foodSubscriptions = userSubscription.Subscription.FoodSubscription;

    const mealTypeIds = [];
    const uniqueMealTypeIds = new Set();

    for (const itemId of skipped_meal_item_ids) {
      const foodSub = foodSubscriptions.find(fs => fs.food_item_id === itemId);
      if (!foodSub) {
        return res.status(400).json({ 
          error: `Food item with ID ${itemId} not found in this subscription` 
        });
      }
      mealTypeIds.push(foodSub.meal_type_id);
      uniqueMealTypeIds.add(foodSub.meal_type_id);
    }

    if (uniqueMealTypeIds.size > 1) {
      return res.status(400).json({ 
        error: "All skipped items must belong to the same meal type" 
      });
    }

    const commonMealTypeId = mealTypeIds[0];

    console.log("sss", commonMealTypeId)
    const { parentPlan1 } = userSubscription.Subscription;

    const orderCriteria = await prisma.Order_Criteria.findFirst({
      where: {
        meal_type_id: commonMealTypeId,
        parent_plan_id: parentPlan1.id,
      },
    });

    if (!orderCriteria) {
      return res
        .status(202)
        .json({ error: "Order criteria not found for this subscription" });
    }

    const skipCriteria = await prisma.Skipped_Cart_Criteria.findFirst({
      where: {
        order_criteria_id: orderCriteria.id,
      },
    });

    if (!skipCriteria) {
      return res
        .status(202)
        .json({ error: "Skip criteria not found for this subscription" });
    }

    const currentTime = new Date();
    const skipDate = new Date(skip_date);
    const orderTime = orderCriteria.order_time;
    const skipPriorTimeHours = parseInt(skipCriteria.skip_prior_time);

    let orderDateTime = new Date(skipDate);
    if (orderTime.startsWith("-")) {
      const [hours, minutes] = orderTime.slice(1).split(":");
      orderDateTime.setDate(orderDateTime.getDate() - 1);
      orderDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    } else {
      const [hours, minutes] = orderTime.split(":");
      orderDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    }

    const latestSkipTime = new Date(orderDateTime);
    latestSkipTime.setHours(latestSkipTime.getHours() - skipPriorTimeHours);

    if (currentTime > latestSkipTime) {
      const timeExceeded =
        Math.abs(currentTime - latestSkipTime) / (1000 * 60 * 60);
      return res.status(400).json({
        error: `Too late to skip! The cutoff was ${latestSkipTime.toLocaleString()}. You're ${timeExceeded.toFixed(
          2
        )} hours late.`,
      });
    }

    const skippedCarts = await prisma.$transaction(
      skipped_meal_item_ids.map((itemId) =>
        prisma.Skipped_Cart.create({
          data: {
            skipped_meal_item_id: itemId,
            skipped_date: skipDate,
            user_subscription_id: user_subscription_id,
            user_id: user_id,
            validity: String(userSubscription.validity_days),
            validity_date: new Date(userSubscription.end_date),
          },
        })
      )
    );

    res.status(200).json({
      message: "Cart items skipped successfully",
      skippedCarts,
    });
  } catch (error) {
    console.error("Error processing skip cart request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSkippedMeals = async (req, res) => {
  const { customer_id } = req.user;

  try {
    const activeSubscriptions = await prisma.user_Subscription.findMany({
      where: {
        customer_id: customer_id,
        status: "ACTIVE",
        start_date: { lte: new Date() },
        end_date: { gte: new Date() },
      },
      include: {
        Subscription: {
          include: {
            DurationSubs: true,
            MealSub: true,
            FoodSubscription: {
              include: {
                FoodItems: true,
              },
            },
            parentPlan1: true,
          },
        },
      },
    });

    if (!activeSubscriptions || activeSubscriptions.length === 0) {
      return res
        .status(202)
        .json({ error: "No active subscriptions found for this user" });
    }

    const skippedCartDetails = await Promise.all(
      activeSubscriptions.map(async (subscription) => {
        const { Subscription, id: user_subscription_id } = subscription;
        const { DurationSubs, MealSub, FoodSubscription, parentPlan1 } =
          Subscription;

        const orderCriteria = await prisma.Order_Criteria.findFirst({
          where: {
            meal_type_id: MealSub.id,
            parent_plan_id: parentPlan1.id,
          },
        });

        if (!orderCriteria) {
          return {
            user_subscription_id,
            error: "Order criteria not found for this subscription",
          };
        }

        const skipCriteria = await prisma.Skipped_Cart_Criteria.findFirst({
          where: {
            order_criteria_id: orderCriteria.id,
          },
        });

        if (!skipCriteria) {
          return {
            user_subscription_id,
            error: "Skip criteria not found for this subscription",
          };
        }

        const skippedCartRecords = await prisma.Skipped_Cart.findMany({
          where: {
            user_subscription_id: user_subscription_id,
          },
          orderBy: {
            skipped_date: "desc",
          },
        });

        return {
          user_subscription_id,
          subscription_details: {
            duration: DurationSubs.actual_days,
            meal_type: MealSub.meal_type,
            food_items: FoodSubscription.map((food) => ({
              id: food.food_item_id,
              name: food.FoodItems.item_name,
            })),
          },
          order_criteria: {
            order_time: orderCriteria.order_time,
            cutoff_time: orderCriteria.cutoff_time,
          },
          skip_criteria: {
            skip_prior_time: skipCriteria.skip_prior_time,
          },
          skipped_details: skippedCartRecords,
          total_times_skipped: skippedCartRecords.length,
        };
      })
    );

    res.status(200).json({ skippedCartDetails });
  } catch (error) {
    console.error("Error fetching skipped cart details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const reorderSkippedItem = async (req, res) => {
  const { skippedCartIds } = req.body;
  const { customer_id, user_id } = req.user;

  try {
    if (
      !skippedCartIds ||
      !Array.isArray(skippedCartIds) ||
      skippedCartIds.length === 0
    ) {
      return res.status(400).json({ message: "Invalid skipped cart IDs" });
    }

    const results = await Promise.all(
      skippedCartIds.map(async (skippedCartId) => {
        const skippedItem = await prisma.skipped_Cart.findUnique({
          where: { skipped_cart_id: skippedCartId },
          include: {
            skippedMealItem: true,
            userSubscriptionSkippedCart: {
              include: {
                Subscription: {
                  include: {
                    MealSub: true,
                    DurationSubs: true,
                    FoodSubscription: { include: { FoodItems: true } },
                  },
                },
              },
            },
          },
        });

        if (!skippedItem) {
          return {
            success: false,
            message: "Skipped item not found",
            id: skippedCartId,
          };
        }

        const currentDate = new Date();
        if (currentDate > new Date(skippedItem.validity_date)) {
          return {
            success: false,
            message: "Validity period has expired",
            id: skippedCartId,
          };
        }

        const foodItem =
          skippedItem.userSubscriptionSkippedCart.Subscription.FoodSubscription.find(
            (item) => item.food_item_id === skippedItem.skipped_meal_item_id
          );

        if (!foodItem) {
          return {
            success: false,
            message: "Food item not found",
            id: skippedCartId,
          };
        }

        const userAddress = await prisma.user_Address.findFirst({
          where: { customer_id: customer_id },
        });

        if (!userAddress) {
          return {
            success: false,
            message: "User's Address not found",
            id: skippedCartId,
          };
        }

        const order = await prisma.orders.create({
          data: {
            customer_id: customer_id,
            subscription_id:
              skippedItem.userSubscriptionSkippedCart.Subscription.id,
            status: "PENDING",
            meal_type_id:
              skippedItem.userSubscriptionSkippedCart.Subscription.MealSub.id,
            total_meal:
              skippedItem.userSubscriptionSkippedCart.Subscription.DurationSubs
                .actual_days,
            charges: 0,
            ordered_address_id: userAddress.id,
            created_at: new Date(),
            updatedAt: new Date(),
          },
        });

        await prisma.order_Item.create({
          data: {
            customer_id: customer_id,
            user_sub_id: skippedItem.userSubscriptionSkippedCart.id,
            food_item_id: foodItem.food_item_id,
            quantity: 1,
            price_id: foodItem.FoodItems.price_id,
            order_id: order.id,
            created_at: new Date(),
            updatedAt: new Date(),
          },
        });

        await prisma.subscription_Order.create({
          data: {
            user_id: user_id,
            customer_id: customer_id,
            order_item_id: foodItem.id,
            user_subscription_id: skippedItem.userSubscriptionSkippedCart.id,
            created_at: new Date(),
            updatedAt: new Date(),
          },
        });

        await prisma.user_Food_Report.create({
          data: {
            user_subscription_id: skippedItem.userSubscriptionSkippedCart.id,
            user_id: user_id,
            customer_id: customer_id,
            breakfast_qty:
              skippedItem.userSubscriptionSkippedCart.Subscription.MealSub
                .meal_type === "Breakfast"
                ? 1
                : 0,
            lunch_qty:
              skippedItem.userSubscriptionSkippedCart.Subscription.MealSub
                .meal_type === "Lunch"
                ? 1
                : 0,
            dinner_qty:
              skippedItem.userSubscriptionSkippedCart.Subscription.MealSub
                .meal_type === "Dinner"
                ? 1
                : 0,
            ordered_date: new Date(),
            created_at: new Date(),
            updatedAt: new Date(),
          },
        });

        await prisma.skipped_Cart.delete({
          where: { skipped_cart_id: skippedCartId },
        });

        return { success: true, id: skippedCartId };
      })
    );

    const failedOperations = results.filter((result) => !result.success);
    if (failedOperations.length > 0) {
      return res.status(207).json({
        message: "Some operations failed",
        results,
        successCount: results.filter((r) => r.success).length,
        failCount: failedOperations.length,
      });
    }

    res.status(200).json({
      message: "All orders placed successfully",
      successCount: results.length,
    });
  } catch (error) {
    console.error("Error reordering skipped items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSkipCriteria = async (req, res) => {
  try {
    const skipCriteria = await prisma.order_Criteria.findMany({
      include: {
        MealType: true,
        SkippedOrderCriteria: true,
      },
    });

    res.status(200).json({ skipCriteria });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch skip criteria" });
  }
};

module.exports = {
  skipCart,
  getSkippedMeals,
  reorderSkippedItem,
  getSkipCriteria,
};
