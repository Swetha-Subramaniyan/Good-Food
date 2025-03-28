const cron = require("node-cron");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require("axios");

const startMealSchedulers = async (req, res) => {
  const cutoffTimes = await prisma.Order_Criteria.findMany();

  cutoffTimes.forEach(({ meal_type_id, cutoff_time }) => {
    if (cutoff_time.startsWith("-")) {
      const [_, hours, minutes] = cutoff_time.match(/-(\d+):(\d+)/);
      const hour = parseInt(hours);
      const minute = parseInt(minutes);
      
      cron.schedule(`${minute} ${hour} * * *`, async () => {
        console.log(`[TOMORROW'S ORDERS] Running at ${hour}:${minute} for meal type ${meal_type_id}`);
        await generateOrders(meal_type_id, true); 
      });
      
      console.log(`Scheduled TOMORROW'S orders for meal ${meal_type_id} to run daily at ${hour}:${minute}`);
    } else {
      const [hour, minute] = cutoff_time.split(":").map(Number);
      
      cron.schedule(`${minute} ${hour} * * *`, async () => {
        console.log(`[TODAY'S ORDERS] Running at ${hour}:${minute} for meal type ${meal_type_id}`);
        await generateOrders(meal_type_id, false); 
      });
      
      console.log(`Scheduled TODAY'S orders for meal ${meal_type_id} to run daily at ${hour}:${minute}`);
    }
  });
};

async function generateOrders(mealTypeId, isForTomorrow) {

  const targetDate = new Date();
  if (isForTomorrow) {
    targetDate.setDate(targetDate.getDate() + 1); 
  }

 
  const activeSubscriptions = await prisma.user_Subscription.findMany({
    where: {
      status: "Active",
      start_date: { lte: targetDate },
      end_date: { gte: targetDate },
      Subscription: { meal_type_id: mealTypeId }
    },
    include: {
      Subscription: {
        include: {
          MealSub: true,
          DurationSubs: true,
          FoodSubscription: { include: { FoodItems: true } }
        }
      },
      userSubscriptionDetails: true,
      userSubscriptionSkippedCart: true
    } 
  });

  for (const sub of activeSubscriptions) {
    const skippedIds = sub.userSubscriptionSkippedCart.map(item => item.skipped_meal_item_id);
    const itemsToOrder = sub.Subscription.FoodSubscription.filter(
      item => !skippedIds.includes(item.food_item_id)
    );  

    if (itemsToOrder.length > 0) {
      await createOrder(sub);
    }
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
