const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllCarts = async (req, res) => {
  try {
    const {customer_id} = req.user;
    const getCart = await prisma.cart.findMany({
      where: { customer_id },
      select: {
        FoodItems: {
          select: {
            id: true,
            item_name: true,
            price_id : true,
          },
        },
        Subscription : {
            select : {
                PricingDetails : {select : {price : true}}
            }
        }
      },
    });
    const cartItems = getCart.map(item => ({
        id : item.FoodItems.id,
        item_name:item.FoodItems.item_name,
        price:item.Subscription.PricingDetails.price
    }))
    res.status(200).json({ message: "success", cartItems });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "No items in cart" });
  }
};

const createCart = async (req, res) => {
  try {
    const { user_id, customer_id } = req.user;
    const { subscription_id, food_item_id } = req.body;
    const newCart = await prisma.cart.create({
      data: {
        subscription_id,
        user_id,
        customer_id,
        food_item_id,
        created_at: new Date(),
        updatedAt: new Date(),
      },
    });
    res.status(200).json({ message: "Created", newCart });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Failure" });
  }
};

const removeCartItem = async (req, res) => {
    try {
      const { user_id } = req.user;
      const { foodItemId } = req.params;
  
      const delItem = await prisma.cart.deleteMany({
        where: { 
            user_id, 
            food_item_id: Number(foodItemId) 
        },
      });
  
      res.status(200).json({ message: "Item removed from cart",delItem });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to remove item from cart" });
    }
  };
  

module.exports = { getAllCarts, createCart,removeCartItem };
