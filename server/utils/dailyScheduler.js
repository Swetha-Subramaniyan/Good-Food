



const cron = require('node-cron');
const { scheduleOrders } = require('./orderScheduler');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const startMealSchedulers = async () => {
  console.log("Meal schedulers initialized...");

  cron.schedule('0 9 * * *', async () => { // Runs every day at 9:00 AM
    try {
      const activeSubscriptions = await prisma.user_Subscription.findMany({
        where: {
          status: 'ACTIVE',
          start_date: { lte: new Date() },
          end_date: { gte: new Date() },
          meals_remaining: { gt: 0 }
        }
      });

      for (const sub of activeSubscriptions) {
        await scheduleOrders(sub);
      }
    } catch (err) {
      console.error("Failed to trigger meal orders:", err.message);
    }
  });
};

module.exports = { startMealSchedulers };
