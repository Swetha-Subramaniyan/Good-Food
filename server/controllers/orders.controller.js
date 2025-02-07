const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { validateOrderTime } = require('../utils/orderUtils');

// Create Order (Step 2 in flow)
const createOrder = async (req, res) => {
  try {
    const {  meal_type_id, total_meal, charges, ordered_address_id } = req.body;

    // 1️⃣ Validate order time using utility function
    await validateOrderTime(meal_type_id);

    // 2️⃣ Create Order in Database
    const newOrder = await prisma.orders.create({
      data: {
        status: "PENDING",
        total_meal,
        charges,
        ordered_address_id,
        created_at: new Date(),
        updatedAt: new Date(),
      },
    });

    return res.status(201).json({ message: "Order created successfully", newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { createOrder };
