const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getOrderDetails = async (req, res) => {
  try {
    const orders = await prisma.Orders.findMany({
      include: {
        OrdersCustomer: true,
        SubscriptionId: {
          include: {
            MealSub: true,
            FoodSubscription: {
              include: {
                FoodItems: true,
              },
            },
          },
        },
        orderedAddress: true,
        orderss: {
          include: {
            foodItems: true,
          },
        },
      },
    });

    const formattedOrders = orders.map((order) => {
      const subscriptionItems = order.SubscriptionId.FoodSubscription.map(
        (item) => ({
          id: item.FoodItems.id,
          name: item.FoodItems.item_name,
          type: item.FoodItems.item_type,
          description: item.FoodItems.description,
          image: item.FoodItems.image_url,
          from: "subscription",
        })
      );

      const orderedItems = order.orderss.map((item) => ({
        id: item.foodItems.id,
        name: item.foodItems.item_name,
        type: item.foodItems.item_type,
        description: item.foodItems.description,
        image: item.foodItems.image_url,
        quantity: item.quantity,
        from: "order",
      }));

      const allItems = [
        ...orderedItems,
        ...subscriptionItems.filter(
          (subItem) =>
            !orderedItems.some((ordItem) => ordItem.id === subItem.id)
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
          image: item.image,
          quantity: item.quantity || 1,
          source: item.from,
        })),
        meta: {
          total_items: allItems.length,
          is_combo: order.SubscriptionId.MealSub.meal_type === "Combo",
          charges: order.charges,
        },
      };
    });

    const ordersByMealType = formattedOrders.reduce((acc, order) => {
      const mealType = order.subscription.meal_type.name;
      if (!acc[mealType]) {
        acc[mealType] = [];
      }
      acc[mealType].push(order);
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      data: {
        orders: formattedOrders,
        grouped_by_meal_type: ordersByMealType,
        total_orders: formattedOrders.length,
      },
    });
  } catch (error) {
    console.error("Error fetching formatted orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch order details",
      error: error.message,
    });
  }
};

const verifyUserPosition = async (req, res) => {
  try {
    const userId = req.user.user_id; 

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await prisma.user_Position.findMany({
      where: { user_id: userId }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("user", user)

    const isDelivery = user[0].position === "DELIVERY";

    return res.status(200).json({ 
      success: true, 
      isDelivery,
      message: isDelivery ? "User is in DELIVERY position" : "User is NOT in DELIVERY position"
    });

  } catch (error) {
    console.error("Error verifying user position:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { order_id, status } = req.body;
    const user_id = req.user.user_id; 
    const user_position = req.user.position; 

    const validStatuses = {
      CHEF: ["PENDING", "PREPARING", "READY"],
      ADMIN: ["READY", "OUT_FOR_DELIVERY", "DELIVERED"],
      DELIVERY: ["OUT_FOR_DELIVERY", "DELIVERED"]
    };

    if (!validStatuses[user_position]?.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status transition for ${user_position}`
      });
    }
    const result = await prisma.$transaction(async (prisma) => {
      const updatedOrder = await prisma.orders.update({
        where: { id: order_id },
        data: { status }
      });

      const orderResponse = await prisma.order_Response.create({
        data: {
          status,
          customer_id: updatedOrder.customer_id,
          delivery_user_id: user_position === "DELIVERY" ? user_id : null,
          user_subscription_id: updatedOrder.subscription_id
        }
      });

      if (status === "DELIVERED") {
        await prisma.delivery.create({
          data: {
            oredr_id: order_id,
            delivery_user_id: user_id,
            customer_id: updatedOrder.customer_id,
            delivery_status: "DELIVERED",
            delivery_response: "SUCCESS"
          }
        });
      }

      return { updatedOrder, orderResponse };
    });

    if (["READY", "OUT_FOR_DELIVERY"].includes(status)) {
      await createNotification(
        result.updatedOrder.customer_id,
        `Your order #${order_id} status changed to ${status}`,
        "ORDER_STATUS_UPDATE"
      );
    }

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message
    });
  }
};

const chefStatusUpdate = async (req, res) => {
  try {
    const { order_id, status } = req.body;
    
    if (!["PREPARING", "READY"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Chef can only update status to PREPARING or READY"
      });
    }

    req.user = { ...req.user, position: "CHEF" };
    return updateOrderStatus(req, res);

  } catch (error) {
    console.error("Error in chef status update:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update chef status",
      error: error.message
    });
  }
};

const adminStatusUpdate = async (req, res) => {
  try {
    const { order_id, status, delivery_user_id } = req.body;
    
    if (!["OUT_FOR_DELIVERY", "DELIVERED"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Admin can only update status to OUT_FOR_DELIVERY or DELIVERED"
      });
    }

    if (status === "OUT_FOR_DELIVERY" && !delivery_user_id) {
      return res.status(400).json({
        success: false,
        message: "Delivery user ID is required for OUT_FOR_DELIVERY status"
      });
    }
    req.user = { ...req.user, position: "ADMIN" };
    return updateOrderStatus(req, res);

  } catch (error) {
    console.error("Error in admin status update:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update admin status",
      error: error.message
    });
  }
};

const deliveryStatusUpdate = async (req, res) => {
  try {
    const { order_id, status, delivery_proof } = req.body;
    
    if (status !== "DELIVERED") {
      return res.status(400).json({
        success: false,
        message: "Delivery can only update status to DELIVERED"
      });
    }

    if (!delivery_proof) {
      return res.status(400).json({
        success: false,
        message: "Delivery proof is required for DELIVERED status"
      });
    }

    req.user = { ...req.user, position: "DELIVERY" };
    return updateOrderStatus(req, res);

  } catch (error) {
    console.error("Error in delivery status update:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update delivery status",
      error: error.message
    });
  }
};

module.exports = { getOrderDetails,verifyUserPosition, updateOrderStatus, chefStatusUpdate,adminStatusUpdate, deliveryStatusUpdate };
