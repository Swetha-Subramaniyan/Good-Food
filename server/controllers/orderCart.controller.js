// controllers/orderCart.controller.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { validateOrderTime } = require('./orderCriteria.controller');

const createAndConfirmOrder = async (req, res) => {
  try {
    const { subscription_id, meal_type_id, order_items } = req.body;
    const { customer_id, user_id } = req.user;

    console.log("FIELDS :",req.body)
    console.log("CUSTOMER ID :",customer_id)


    if (!meal_type_id || !subscription_id || !order_items?.length) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await validateOrderTime(meal_type_id);

    const userAddress = await prisma.user_Address.findFirst({ where: { customer_id } });
    console.log("USER ADDRESS :",userAddress)
    if (!userAddress) {
      return res.status(404).json({ error: "User address not found" });
    }

    let total_meal = 0;
    let charges = 0;

    for (const item of order_items) {
      const priceDetail = await prisma.pricing_Details.findUnique({ where: { id: item.price_id } });
      if (!priceDetail) {
        return res.status(400).json({ error: "Invalid price_id" });
      }
      total_meal += parseInt(item.quantity);
      charges += priceDetail.price * item.quantity;
    }

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

    const confirmedOrder = await prisma.orders.update({
      where: { id: order.id },
      data: { status: "ACTIVE", updatedAt: new Date() },
    });

    const cartItems = await Promise.all(
      order_items.map(async (item) => {
        return await prisma.cart.create({
          data: {
            subscription_id: parseInt(subscription_id),
            user_id,
            customer_id,
            food_item_id: item.food_item_id,
            created_at: new Date(),
            updatedAt: new Date(),
          },
        });
      })
    );

    res.status(201).json({
      message: "Order confirmed and added to cart!",
      order: confirmedOrder,
      cartItems,
    });

  } catch (error) {
    console.error("Order and cart flow failed:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createAndConfirmOrder };
