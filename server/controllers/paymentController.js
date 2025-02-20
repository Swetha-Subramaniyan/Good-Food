// require("dotenv").config();
// console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);  

// const Razorpay = require("razorpay");

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// const createOrder = async (req, res) => {
//   try {
//     const { amount } = req.body;
//     const options = {
//       amount: amount * 100,
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     console.log("Creating Order with options:", options);
//     const order = await razorpay.orders.create(options);
//     console.log("Order Created Successfully:", order);

//     res.status(200).json({ success: true, order });
//   } catch (error) {
//     console.error("Error creating Razorpay order:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };


// const getKey = async (req,res) => {
//   res.status(200).json({key:process.env.RAZORPAY_KEY_ID})
// }
// module.exports = { createOrder,getKey };




require("dotenv").config();
const Razorpay = require("razorpay");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrderAndSubscription = async (req, res) => {
  try {
    const { amount, subscription_id } = req.body;
    if (!amount || !subscription_id ) {
      return res.status(400).json({ error: "Amount, subscription_id are required" });
    }

    const orderOptions = {
      amount: amount * 100, 
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(orderOptions);
    console.log("Razorpay Order Created:", order);

   

    const { customer_id } = req.user;

    const subscription = await prisma.subscription.findUnique({
      where: { id: Number(subscription_id) },
    });

    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    const subscriptionData = await prisma.subscription.findUnique({
      where: { id: subscription.id },
      include: {
        DurationSub: { select: { quantity: true } },
        DurationSubs: { select: { actual_days: true, addon_days: true } },
        MealSub: { select: { meal_type: true } },
        PricingDetails: { select: { price: true } },
      },
    });

    if (!subscriptionData) {
      return res.status(404).json({ error: "Subscription details not found" });
    }

    const quantity = subscriptionData.DurationSub?.quantity || 0;
    const actual_days = subscriptionData.DurationSubs?.actual_days || 0;
    const addon_days = subscriptionData.DurationSubs?.addon_days || 0;
    const validity = actual_days + addon_days;

    const start_date = new Date();
    const end_date = new Date(start_date);
    end_date.setDate(start_date.getDate() + quantity);

    console.log("Start Date:", start_date.toISOString().split("T")[0]);
    console.log("End Date:", end_date.toISOString().split("T")[0]);
    console.log("Validity Days:", validity);
    console.log("Customer_ID:", customer_id);

    const userSubscription = await prisma.user_Subscription.create({
      data: {
        subscription_id: subscription.id,
        start_date,
        end_date,
        status: "Pending", 
        customer_id,
        validity_days: validity,
        created_at: new Date(),
        updatedAt: new Date(),
      },
    });

    res.status(200).json({
      message: "Order Created & Subscription Activated",
      order,
      subscription: userSubscription,
    });

  } catch (error) {
    console.error("Error processing payment and subscription:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Razorpay Key (for frontend)
const getKey = async (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
};

module.exports = { createOrderAndSubscription, getKey };
