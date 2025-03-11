// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
// const { validateOrderTime } = require('../utils/orderUtils');

// // Create Order (Step 2 in flow)
// const createOrder = async (req, res) => {
//   try {
//     const {  subscription_id,meal_type_id, total_meal, charges, ordered_address_id } = req.body;

//     // 1️⃣ Validate order time using utility function
//     await validateOrderTime(meal_type_id);

//     // 2️⃣ Create Order in Database
//     const newOrder = await prisma.orders.create({
//       data: {
//         subscription_id,
//         customer_id,
//         status: "PENDING",
//         total_meal,           
//         charges,
//         ordered_address_id,
//         created_at: new Date(),
//         updatedAt: new Date(),
//       },
//     });

//     return res.status(201).json({ message: "Order created successfully", newOrder });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     return res.status(400).json({ error: error.message });
//   }
// };

// module.exports = { createOrder };



const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { validateOrderTime } = require('./orderCriteria.controller');

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.orders.findMany({
      include: { orderss: true },
    });
    res.status(200).json({ message: "Orders fetched successfully", orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { subscription_id, meal_type_id, order_items } = req.body;
    const { customer_id } = req.user;

    if (!meal_type_id || !subscription_id || !order_items?.length) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate order time dynamically
    await validateOrderTime(meal_type_id);

    // Get user's address
    const userAddress = await prisma.user_Address.findFirst({
      where: { customer_id },
    });

    if (!userAddress) {
      return res.status(404).json({ error: "User address not found" });
    }

    let total_meal = 0;
    let charges = 0;

    for (const item of order_items) {
      const priceDetail = await prisma.pricing_Details.findUnique({
        where: { id: item.price_id },
      });

      if (!priceDetail) {
        return res.status(400).json({ error: "Invalid price_id" });
      }

      total_meal += parseInt(item.quantity);
      charges += priceDetail.price * item.quantity;
    }

    // Create the order
    const order = await prisma.orders.create({
      data: {
        customer_id,
        subscription_id: parseInt(subscription_id),
        status: "PENDING",
        meal_type_id: parseInt(meal_type_id),
        total_meal,
        charges,
        ordered_address_id: userAddress.id,
        created_at: new Date(),
        updatedAt: new Date(),
        orderss: {
          create: order_items.map((item) => ({
            customer_id,
            user_sub_id: parseInt(item.user_sub_id),
            food_item_id: parseInt(item.food_item_id),
            quantity: parseInt(item.quantity),
            price_id: parseInt(item.price_id),
            created_at: new Date(),
            updatedAt: new Date(),
          })),
        },
      },
      include: { orderss: true },
    });

    res.status(201).json({ message: "Order placed successfully!", order });
  } catch (error) {
    console.error("Order creation failed:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Update order status (e.g., confirm)
const updateOrder = async (req, res) => {
  const { order_id } = req.body;
  const { customer_id } = req.user;

  try {
    const order = await prisma.orders.findFirst({
      where: {
        id: order_id,
        customer_id,
        status: "PENDING",
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Pending order not found" });
    }

    const updatedOrder = await prisma.orders.update({
      where: { id: order_id },
      data: { status: "ACTIVE", updatedAt: new Date() },
    });

    res.status(200).json({ message: "Order confirmed!", updatedOrder });
  } catch (error) {
    console.error("Order confirmation failed:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createOrder, getAllOrders, updateOrder };

