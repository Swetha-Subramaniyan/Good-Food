const { PrismaClient } = require("@prisma/client");
const express = require("express");
const prisma = new PrismaClient();

const skipCart = async (req, res) => {
  const { skipped_meal_item_id, user_subscription_id } = req.body;
  const {user_id} = req.user;

  try {
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

    const { Subscription } = userSubscription;
    const { DurationSubs, MealSub, FoodSubscription, parentPlan1 } = Subscription;

    console.log("Subscription Details:", Subscription);

    const orderCriteria = await prisma.Order_Criteria.findFirst({
      where: {
        meal_type_id: MealSub.id,
        parent_plan_id: parentPlan1.id,
      },
    });

    if (!orderCriteria) {
      return res
        .status(202)
        .json({ error: "Order criteria not found for this subscription" });
    }

    console.log("Order Criteria:", orderCriteria);

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

    console.log("Skip Criteria:", skipCriteria);

    const currentTime = new Date();
    const orderTime = orderCriteria.order_time; 
    const skipPriorTimeHours = parseInt(skipCriteria.skip_prior_time); 

    let orderDateTime;
    if (orderTime.startsWith("-")) {
      const [hours, minutes] = orderTime.slice(1).split(":");
      orderDateTime = new Date(currentTime);
      orderDateTime.setDate(orderDateTime.getDate() - 1); 
      orderDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    } else {
      const [hours, minutes] = orderTime.split(":");
      orderDateTime = new Date(currentTime);
      orderDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    }

    const latestSkipTime = new Date(orderDateTime);
    latestSkipTime.setHours(latestSkipTime.getHours() - skipPriorTimeHours);

    console.log("Current Time:", currentTime);
    console.log("Order Time:", orderDateTime);
    console.log("Latest Skip Time:", latestSkipTime);

    if (currentTime > latestSkipTime) {
      const timeExceeded =
        Math.abs(currentTime - latestSkipTime) / (1000 * 60 * 60); 
      return res.status(200).json({
        error: `Time exceeded by ${timeExceeded.toFixed(
          2
        )} hours. You cannot skip now. Try early next time.`,
      });
    }

    const skippedCart = await prisma.Skipped_Cart.create({
      data: {
        skipped_meal_item_id: skipped_meal_item_id,
        skipped_date: currentTime,
        user_subscription_id: user_subscription_id,
        user_id: user_id, 
        validity: String(userSubscription.validity_days),
        validity_date: new Date(userSubscription.end_date),
      },
    });

    res.status(200).json({
      message: "Cart item skipped successfully",
      skippedCart,
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
      return res.status(202).json({ error: "No active subscriptions found for this user" });
    }

    const skippedCartDetails = await Promise.all(
      activeSubscriptions.map(async (subscription) => {
        const { Subscription, id: user_subscription_id } = subscription;
        const { DurationSubs, MealSub, FoodSubscription, parentPlan1 } = Subscription;

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
  const { skippedCartId } = req.body;
  const {customer_id , user_id} = req.user;

  try {
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
      return res.status(202).json({ message: "Skipped item not found" });
    }

    const currentDate = new Date();
    if (currentDate > new Date(skippedItem.validity_date)) {
      return res.status(200).json({ message: "Validity period has expired" });
    }

    console.log(skippedItem)

    const foodItem = skippedItem.userSubscriptionSkippedCart.Subscription.FoodSubscription.find(
      (item) => item.food_item_id === skippedItem.skipped_meal_item_id
    );

    if (!foodItem) {
      return res.status(202).json({ message: "Food item not found" });
    }

    const userAddress = await prisma.user_Address.findFirst({
      where: { customer_id: customer_id },
    });

    if (!userAddress ) {
      return res.status(404).json({ msg: "User's Address not found" });
    }

    const order = await prisma.orders.create({
      data: {
        customer_id: customer_id,
        subscription_id: skippedItem.userSubscriptionSkippedCart.Subscription.id,
        status: "PENDING",
        meal_type_id: skippedItem.userSubscriptionSkippedCart.Subscription.MealSub.id,
        total_meal: skippedItem.userSubscriptionSkippedCart.Subscription.DurationSubs.actual_days,
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
        breakfast_qty: skippedItem.userSubscriptionSkippedCart.Subscription.MealSub.meal_type === "Breakfast" ? 1 : 0,
        lunch_qty: skippedItem.userSubscriptionSkippedCart.Subscription.MealSub.meal_type === "Lunch" ? 1 : 0,
        dinner_qty: skippedItem.userSubscriptionSkippedCart.Subscription.MealSub.meal_type === "Dinner" ? 1 : 0,
        ordered_date: new Date(),
        created_at: new Date(),
        updatedAt: new Date(),
      },
    });

    await prisma.skipped_Cart.delete({
      where: { skipped_cart_id: skippedCartId },
    });

    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("Error reordering skipped item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { skipCart,getSkippedMeals, reorderSkippedItem };