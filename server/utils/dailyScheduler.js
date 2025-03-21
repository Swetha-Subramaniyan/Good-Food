const cron = require("node-cron");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require("axios");

const startMealSchedulers = async (req, res) => {
  const cutoffTimes = await prisma.Order_Criteria.findMany();

  console.log("cut off time", cutoffTimes);

  cutoffTimes.forEach(({ meal_type_id, cutoff_time }) => {
    let hour, minute;

    if (cutoff_time.startsWith("-")) {
      const [negativeHours, minutes] = cutoff_time.slice(1).split(":");
      hour = 24 - parseInt(negativeHours);
      minute = parseInt(minutes);
    } else {
      [hour, minute] = cutoff_time.split(":");
    }

    console.log("hour", hour);
    console.log("minute", minute);

    cron.schedule(`${minute} ${hour} * * *`, async () => {
      console.log(
        `Running order generation for meal type ${meal_type_id} at ${cutoff_time}...`
      );
      await generateOrders(meal_type_id);
    });

    console.log(
      `Scheduled cron job for meal type ${meal_type_id} at ${cutoff_time}`
    );
  });
};

async function fetchActiveSubscriptions(mealTypeId) {
  return await prisma.user_Subscription.findMany({
    where: {
      status: "ACTIVE",
      start_date: { lte: new Date() },
      end_date: { gte: new Date() },
      Subscription: {
        meal_type_id: mealTypeId,
      },
    },
    include: {
      Subscription: {
        include: {
          MealSub: true,
          DurationSubs: true,
          FoodSubscription: { include: { FoodItems: true } },
        },
      },
      userSubscriptionDetails: true,
    },
  });
}

async function generateOrders(mealTypeId) {
  try {
    const activeSubscriptions = await fetchActiveSubscriptions(mealTypeId);

    for (const subscription of activeSubscriptions) {
      const skippedItems = subscription.skippedCart.map(
        (skipped) => skipped.skipped_meal_item_id
      );

      const foodItemsToOrder =
        subscription.Subscription.FoodSubscription.filter(
          (foodItem) => !skippedItems.includes(foodItem.food_item_id)
        );

      if (foodItemsToOrder.length > 0) {
        await createOrder(subscription, foodItemsToOrder);
        console.log("Order created for subscription:", subscription.id);
      } else {
        console.log("No items to order for subscription:", subscription.id);
      }
    }
  } catch (error) {
    console.error("Error generating orders:", error);
  }
}

async function createOrder(subscription) {
  const { Subscription, userSubscriptionDetails } = subscription;
  const { MealSub, DurationSubs, FoodSubscription } = Subscription;

  console.log("in", subscription, FoodSubscription);

  if (!FoodSubscription || FoodSubscription.length === 0) {
    console.log("No food items found for subscription:", subscription.id);
    return;
  }

  const order = await prisma.Orders.create({
    data: {
      customer_id: userSubscriptionDetails.customer_id,
      subscription_id: Subscription.id,
      status: "PENDING",
      meal_type_id: MealSub.id,
      total_meal: DurationSubs.actual_days,
      charges: 0,
      ordered_address_id: userSubscriptionDetails.id,
      created_at: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log("order", order);

  for (const foodItem of FoodSubscription) {
    const food = await prisma.Order_Item.create({
      data: {
        customer_id: userSubscriptionDetails.customer_id,
        user_sub_id: subscription.id,
        food_item_id: foodItem.food_item_id,
        quantity: 1,
        price_id: foodItem.FoodItems.price_id,
        order_id: order.id,
        created_at: new Date(),
        updatedAt: new Date(),
      },
    });
    console.log("order", food);
  }

  for (const foodItem of FoodSubscription) {
    const subscriptionOrder = await prisma.Subscription_Order.create({
      data: {
        user_id: userSubscriptionDetails.id,
        customer_id: userSubscriptionDetails.customer_id,
        order_item_id: foodItem.id,
        user_subscription_id: subscription.id,
        created_at: new Date(),
        updatedAt: new Date(),
      },
    });
    console.log("Subscription_Order created:", subscriptionOrder);
  }

  const userFoodReport = await prisma.User_Food_Report.create({
    data: {
      user_subscription_id: subscription.id,
      user_id: userSubscriptionDetails.id,
      customer_id: userSubscriptionDetails.customer_id,
      breakfast_qty: MealSub.meal_type === "Breakfast" ? 1 : 0,
      lunch_qty: MealSub.meal_type === "Lunch" ? 1 : 0,
      dinner_qty: MealSub.meal_type === "Dinner" ? 1 : 0,
      ordered_date: new Date(),
      created_at: new Date(),
      updatedAt: new Date(),
    },
  });
  console.log("User_Food_Report created:", userFoodReport);

  /* try {
    const response = await axios.post("http://localhost:5001/notification/sendNotificationOnOrderProcessing", {
      data: {
        subscription,
      },
    });
    console.log("Controller response:", response.data);

  } catch (error) {
    console.error("Error calling controller:", error);
  }
 */

  console.log(
    `Order created for customer ${userSubscriptionDetails.customer_id} for meal type ${MealSub.id}`
  );
}

module.exports = { startMealSchedulers };
