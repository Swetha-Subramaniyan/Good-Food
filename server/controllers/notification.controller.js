const { PrismaClient } = require("@prisma/client");
const express = require("express");
const prisma = new PrismaClient();
const sendNotification = require("../utils/notificationTrigger.utils");
const {
  AddressUpdateTemplateHTML,
} = require("../utils/EmailTemplates/AddressUpdateTemplate");

const {
  MultipleAddressUpdateTemplateHTML,
} = require("../utils/EmailTemplates/MultipleAddressUpdateTemplate");

const {
  SubscriptionTemplateHTML,
} = require("../utils/EmailTemplates/SubscriptionTemplate");

const {
  FoodProcessingUserTemplateHTML,
} = require("../utils/EmailTemplates/FoodProcessingUserTemplate");

const { format, addDays } = require("date-fns");

const sendEmailOnUserAddressUpdate = async (req, res, next) => {
  try {
    const entity_type = "user_address";

    const { entity_id } = req.body;
    const { customer_id, user_id, email } = req.user;

    const updatedUserAddress = await prisma.user_Address.findUnique({
      where: { id: entity_id },
    });

    if (!updatedUserAddress) {
      return res.status(404).json({ msg: "Address not found" });
    }

    const notificationDescription = `Your delivery address has been successfully updated. New details: ${updatedUserAddress.street}, ${updatedUserAddress.city}, ${updatedUserAddress.pincode}.`;

    const userAddress = await prisma.user_Address.findFirst({
      where: { customer_id: customer_id },
    });

    if (!userAddress && !userAddress.phone_number) {
      return res.status(404).json({ msg: "User's Phone Number not found" });
    }

    const whatsappNumber = userAddress.phone_number;

    await sendNotification({
      entity_type,
      entity_id,
      customer_id,
      user_id,
      notificationDescription,
      email,
      emailSubject: "Delivery Address Updated",
      emailTemplate: AddressUpdateTemplateHTML(),
      whatsappNumber,
      whatsappMessage: notificationDescription,
    });

    res.status(200).json({ msg: "Success" });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const sendEmailOnUserMultipleAddressUpdate = async (req, res, next) => {
  try {
    const entity_type = "user_address";
    const { entity_id } = req.body;
    const { customer_id, user_id, email } = req.user;

    const updatedAddresses = await prisma.user_Address.findMany({
      where: { customer_id },
    });

    if (!updatedAddresses.length) {
      return res.status(404).json({ msg: "No updated addresses found." });
    }

    const formattedAddresses = updatedAddresses
      .map((addr, index) => {
        return `(${index + 1}) ${addr.street}, ${addr.city} ${addr.pincode}`;
      })
      .join("\n");

    const notificationDescription = `You have successfully updated multiple delivery addresses. Here are the details:\n\n${formattedAddresses}`;

    const userAddress = await prisma.user_Address.findFirst({
      where: { customer_id: customer_id },
    });

    if (!userAddress && !userAddress.phone_number) {
      return res.status(404).json({ msg: "User's Phone Number not found" });
    }

    const whatsappNumber = userAddress.phone_number;

    await sendNotification({
      entity_type,
      entity_id,
      customer_id,
      user_id,
      email,
      notificationDescription,
      emailSubject: "Delivery Address Updated",
      emailTemplate: MultipleAddressUpdateTemplateHTML(updatedAddresses),
      whatsappNumber,
      whatsappMessage: notificationDescription,
    });

    res.status(200).json({ msg: "Success" });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const sendNotificationOnSubscription = async (req, res, next) => {
  try {
    const entity_type = "Subscription";
    const { entity_id } = req.body;

    const { customer_id, user_id, email, username } = req.user;

    const subscriptionData = await prisma.subscription.findUnique({
      where: { id: entity_id },
      include: {
        SubscriptionPayments: true,
        parentPlan1: true,
        TierSub: true,
        DurationSub: true,
        DurationSubs: true,
        MealSub: true,
        PricingDetails: true,
      },
    });

    if (!subscriptionData) {
      return res.status(404).json({ msg: "Subscription not found" });
    }
    console.log("ss", subscriptionData);

    const startDate = new Date(subscriptionData.created_at);
    const actualDays = subscriptionData.DurationSubs.actual_days;

    const endDate =
      actualDays === 1 ? startDate : addDays(startDate, actualDays - 1);

    const formattedStartDate = format(startDate, "d MMM yyyy");
    const formattedEndDate = format(endDate, "d MMM yyyy");

    const notificationDescription = `You have successfully subscribed to the ${subscriptionData.parentPlan1.plan_name} plan with a ${subscriptionData.TierSub.type} tier. Your subscription includes a ${subscriptionData.MealSub.meal_type} meal for a duration of ${subscriptionData.DurationSubs.actual_days} days. The total price for this subscription is $${subscriptionData.PricingDetails.price}.`;

    const userAddress = await prisma.user_Address.findFirst({
      where: { customer_id: customer_id },
    });

    if (!userAddress && !userAddress.phone_number) {
      return res.status(404).json({ msg: "User's Phone Number not found" });
    }

    const whatsappNumber = userAddress.phone_number;

    await sendNotification({
      entity_type,
      entity_id,
      customer_id,
      user_id,
      email,
      notificationDescription,
      emailSubject: "Subscribed for Meal",
      emailTemplate: SubscriptionTemplateHTML(
        username,
        subscriptionData.parentPlan1.plan_name,
        formattedStartDate,
        formattedEndDate,
        "http://localhost:3000/user/IndividualPackBreakfastBudget",
        "http://localhost:3000/user/IndividualPackBreakfastBudget"
      ),
      whatsappNumber,
      whatsappMessage: notificationDescription,
    });
    res.status(200).json({ msg: "Success" });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const sendNotificationOnOrderProcessing = async (req, res, next) => {
  try {
    const entity_type = "Subscription";
    const { subscription } = req.body;

    const { customer_id, user_id, email, username } = req.user;

    const foodSubscription = subscription.Subscription.FoodSubscription;
    const mealItems = foodSubscription.map((food) => food.FoodItems);

    const mealType = subscription.Subscription.MealSub.meal_type;
    const plan = subscription.Subscription.plan_description;

    const modifyUrl = `https://Good-Food.com/modify/${subscription.id}`;
    const skipMealUrl = `https://Good-Food.com/skip/${subscription.id}`;

    const startDate = new Date(subscription.start_date)
      .toISOString()
      .split("T")[0];
    const endDate = new Date(subscription.end_date).toISOString().split("T")[0];

    const emailTemplate = FoodProcessingUserTemplateHTML(
      username,
      plan,
      startDate,
      endDate,
      new Date().toISOString().split("T")[0],
      mealType,
      mealItems,
      modifyUrl,
      skipMealUrl
    );

    const notificationDescription = `Your meal for ${
      new Date().toISOString().split("T")[0]
    } is being prepared! You can modify your future meals or skip upcoming ones if needed.`;

    const userAddress = await prisma.user_Address.findFirst({
      where: { customer_id: customer_id },
    });

    if (!userAddress.phone_number) {
      return res.status(404).json({ msg: "User's Phone Number not found" });
    }

    const whatsappNumber = userAddress.phone_number;

    await sendNotification({
      entity_type,
      entity_id: subscription.id,
      customer_id,
      user_id,
      notificationDescription,
      email,
      emailSubject: "Your Meal is Being Prepared!",
      emailTemplate: emailTemplate,
      whatsappNumber,
      whatsappMessage: notificationDescription,
    });

    res.status(200).json({ msg: "Success" });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const getAllNotificationsWithDetails = async (req, res, next) => {
  try {
    const { customer_id } = req.user;

    const notifications = await prisma.notification.findMany({
      where: {
        customer_id: customer_id,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    if (!notifications || notifications.length === 0) {
      return res.status(202).json({
        msg: "No notifications found for this customer",
        notifications: [],
      });
    }

    const notificationDetails = await prisma.Notication_Details.findMany({
      where: {
        id: {
          in: notifications.map((notif) => notif.notification_details_id),
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    if (!notificationDetails || notificationDetails.length === 0) {
      return res.status(202).json({
        msg: "No notification details found for these notifications",
        notifications: [],
      });
    }

    const notificationsWithDetails = await Promise.all(
      notifications.map(async (notification) => {
        const notificationDetail = notificationDetails.find(
          (detail) => detail.id === notification.notification_details_id
        );

        if (!notificationDetail) {
          return {
            ...notification,
            notificationDetails: null,
            details: null,
          };
        }

        let details = null;

        switch (notificationDetail.entity_type) {
          case "Subscription":
            details = await prisma.subscription.findUnique({
              where: { id: notificationDetail.entity_id },
              include: {
                parentPlan1: true,
                TierSub: true,
                DurationSubs: true,
                MealSub: true,
                PricingDetails: true,
              },
            });
            break;

          case "user_address":
            details = await prisma.User_Address.findMany({
              where: { customer_id: customer_id },
            });
            break;

          case "CANCELLATION":
            details = await prisma.cancellation.findUnique({
              where: { id: notificationDetail.entity_id },
              include: {
                Cancellation_Criteria: true,
                Subscription: true,
                User_Subscription: true,
              },
            });
            break;

          case "SKIPPED_CART":
            details = await prisma.skipped_Cart.findUnique({
              where: { id: notificationDetail.entity_id },
              include: {
                skippedMealItem: true,
                userSubscriptionSkippedCart: true,
                SkippedUser: true,
              },
            });
            break;

          default:
            details = null;
        }

        return {
          ...notification,
          notificationDetails: notificationDetail, 
          details, 
        };
      })
    );

    res.status(200).json({ notifications: notificationsWithDetails });
  } catch (error) {
    console.error("Error fetching notifications with details:", error);
    return next(error);
  }
};

const markNotificationAsViewed = async (req, res) => {
  try {
    const { notifications } = req.body;

    if (!Array.isArray(notifications) || notifications.length === 0) {
      return res
        .status(400)
        .json({ message: "Notification IDs array is required" });
    }

    const updatedNotifications = await prisma.notification.updateMany({
      where: { id: { in: notifications.map(Number) } },
      data: { viewed: true },
    });

    return res.status(200).json({
      message: "Notifications marked as viewed",
      updatedCount: updatedNotifications.count,
    });
  } catch (error) {
    console.error("Error updating notifications:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getNotificationCount = async (req, res) => {
  try {
    const userId = req.user.user_id;

    let notificationCount = await prisma.notification.count({
      where: {
        user_id: userId,
        viewed: false,
      },
    });

    return res.status(200).json({ count: notificationCount });
  } catch (error) {
    console.error("Error fetching notification count:", error);
    return res.status(500).json({
      error: "An error occurred while fetching the notification count",
    });
  }
};

module.exports = {
  sendEmailOnUserAddressUpdate,
  sendEmailOnUserMultipleAddressUpdate,
  sendNotificationOnSubscription,
  sendNotificationOnOrderProcessing,
  getAllNotificationsWithDetails,
  markNotificationAsViewed,
  getNotificationCount,
};
