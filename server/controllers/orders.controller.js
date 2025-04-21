const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { validateOrderTime } = require("./orderCriteria.controller");

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

const createOrder = async (req, res) => {
  try {
    const { subscription_id, meal_type_id, order_items } = req.body;
    const { customer_id } = req.user;

    if (!meal_type_id || !subscription_id || !order_items?.length) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await validateOrderTime(meal_type_id);

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

const getUserOrders = async (req, res) => {
  try {
    const { customerId } = req.user;

    const orders = await prisma.Orders.findMany({
      where: {
        customer_id: customerId,
      },
      include: {
        OrdersCustomer: true,
        SubscriptionId: {
          include: {
            MealSub: true,
            FoodSubscription: {
              include: {
                FoodItems: {
                  include: {
                    SubscriptionPriceDetails: true,
                  },
                },
              },
            },
          },
        },
        orderedAddress: true,
        orderss: {
          include: {
            foodItems: {
              include: {
                SubscriptionPriceDetails: true,
              },
            },
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    const orderIds = orders.map((order) => order.id);

    const allResponses = await prisma.Order_Response.findMany({
      where: {
        order_id: { in: orderIds },
      },
      orderBy: {
        created_at: 'asc', 
      },
    });

    const groupedResponses = {};
    allResponses.forEach((response) => {
      if (!groupedResponses[response.order_id]) {
        groupedResponses[response.order_id] = [];
      }
      groupedResponses[response.order_id].push(response);
    });

    const formattedOrders = orders.map((order) => {

      const subscriptionItems = order.SubscriptionId.FoodSubscription.map((item) => ({
        id: item.FoodItems.id,
        name: item.FoodItems.item_name,
        type: item.FoodItems.item_type,
        description: item.FoodItems.description,
        price: item.SubscriptionPriceDetails?.price,
        image: item.FoodItems.image_url,
        from: "subscription",
      }));

      const orderedItems = order.orderss.map((item) => ({
        id: item.foodItems.id,
        name: item.foodItems.item_name,
        type: item.foodItems.item_type,
        description: item.foodItems.description,
        price: item.foodItems.SubscriptionPriceDetails?.price,
        image: item.foodItems.image_url,
        quantity: item.quantity,
        from: "order",
      }));

      const allItems = [
        ...orderedItems,
        ...subscriptionItems.filter(
          (subItem) => !orderedItems.some((ordItem) => ordItem.id === subItem.id)
        ),
      ];

      return {
        order_id: order.id,
        order_status: order.status,
        order_date: order.created_at,
        scheduled_delivery_date: order.ordered_date,
        customer: {
          id: order.OrdersCustomer.id,
          customer_id: order.OrdersCustomer.customer_id,
          name: order.OrdersCustomer.username,
          email: order.OrdersCustomer.email,
          phone: order.OrdersCustomer.phone_number,
          profile_picture: order.OrdersCustomer.display_picture,
        },
        subscription: {
          id: order.SubscriptionId.id,
          plan_description: order.SubscriptionId.plan_description,
          meal_type: {
            id: order.SubscriptionId.MealSub.id,
            name: order.SubscriptionId.MealSub.meal_type,
          },
          total_meals: order.total_meal,
        },
        delivery_details: {
          address_id: order.orderedAddress.id,
          recipient_name: order.orderedAddress.name,
          phone: order.orderedAddress.phone_number,
          alternate_phone: order.orderedAddress.alternate_number,
          full_address: [
            order.orderedAddress.street,
            order.orderedAddress.landmark,
            order.orderedAddress.city,
            order.orderedAddress.pincode,
          ]
            .filter(Boolean)
            .join(", "),
          special_instructions: order.orderedAddress.landmark,
        },
        items: allItems.map((item) => ({
          id: item.id,
          name: item.name,
          type: item.type,
          description: item.description,
          price: item.price,
          image: item.image,
          quantity: item.quantity || 1,
          source: item.from,
        })),
        meta: {
          total_items: allItems.length,
          is_combo: order.SubscriptionId.MealSub.meal_type === "Combo",
          charges: order.charges,
        },
        status: groupedResponses[order.id] || [], 
      };
    });

    res.status(200).json({
      success: true,
      data: {
        orders: formattedOrders,
        total_orders: formattedOrders.length,
      },
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user orders",
      error: error.message,
    });
  }
};


module.exports = { createOrder, getAllOrders, updateOrder, getUserOrders };
