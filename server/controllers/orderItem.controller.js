const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addOrderItem = async (req, res) => {
  try {
    const { order_id, customer_id, user_sub_id, quantity, price_id } = req.body;

    const order = await prisma.orders.findUnique({ where: { id: order_id } });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const newItem = await prisma.order_Item.create({
      data: {
        order_id,
        customer_id,
        user_sub_id,
        quantity,
        price_id,
        created_at: new Date(),
        updatedAt: new Date(),
      },
    });

    res.status(201).json({ message: "Item added to order", newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add item" });
  }
};

module.exports={addOrderItem}
