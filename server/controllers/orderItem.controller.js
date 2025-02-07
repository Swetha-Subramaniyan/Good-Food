const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addOrderItems = async (req, res) => {
  try {
    const { order_id, user_sub_id, food_items } = req.body;

    if (!order_id) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    const order = await prisma.orders.findMany({ where: { id: order_id } });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const orderItems = await Promise.all(
      food_items.map(async (item) => {
        return await prisma.order_Item.create({
          data: {
            user_sub_id,
            food_item_id: item.food_item_id,
            quantity: item.quantity,
            price_id: item.price_id,
            order_id,
            created_at: new Date(),
            updatedAt: new Date(),
          },
        });
      })
    );

    return res.status(201).json({ message: "Order items added successfully", orderItems });
  } catch (error) {
    console.error("Error adding order items:", error);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { addOrderItems };
