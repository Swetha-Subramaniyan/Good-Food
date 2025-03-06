const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const scheduleOrders = async (subscription) => {
  try {
    const today = new Date();
    const orderExists = await prisma.orders.findFirst({
      where: {
        subscription_id: subscription.id,
        order_date: today,
      }
    });

    if (orderExists) {
      console.log(`Order already placed for subscription ${subscription.id}`);
      return;
    }

    await prisma.orders.create({
      data: {
        customer_id: subscription.customer_id,
        subscription_id: subscription.id,
        meal_type_id: 1, // Default meal, can be customized
        status: 'PENDING',
        order_date: today,
        created_at: today,
        updatedAt: today
      }
    });

    await prisma.user_Subscription.update({
      where: { id: subscription.id },
      data: {
        meals_remaining: { decrement: 1 }
      }
    });

    console.log(`✅ Order created for subscription ${subscription.id}`);
  } catch (err) {
    console.error("Failed to schedule order:", err.message);
  }
};

module.exports = { scheduleOrders };
