const { PrismaClient } = require("@prisma/client");
const express = require("express");
const prisma = new PrismaClient();

const skipCart = async (req, res) => {
  const {
    skipped_meal_item_id,
    user_subscription_id,
    user_id,
    validity,
    validity_date,
  } = req.body;

  try {
    const userSubscription = await prisma.user_Subscription.findUnique({
      where: { id: user_subscription_id },
    });
    console.log("sss", userSubscription)

    if (!userSubscription) {
      return res.status(404).json({ error: "User subscription not found" });
    }

    const skipCriteria = await prisma.Skipped_Cart_Criteria.findFirst({
      where: {
        order_criteria_id: userSubscription.subscription_id, 
      },
    });

    if (!skipCriteria) {
      return res
        .status(400)
        .json({ error: "Skip criteria not found for this subscription" });
    }

    const currentTime = new Date();
    const skipPriorTime = new Date(skipCriteria.skip_prior_time);

    if (currentTime < skipPriorTime) {
      return res.status(400).json({ error: "Skip request is too late" });
    }

    const skippedCart = await prisma.Skipped_Cart.create({
      data: {
        skipped_meal_item_id: skipped_meal_item_id,
        skipped_date: new Date(),
        user_subscription_id: user_subscription_id,
        user_id: user_id,
        validity: validity,
        validity_date: new Date(validity_date),
      },
    });

    res.status(200).json({
      message: "Cart item skipped successfully",
      skippedCart,
    });
  } catch (error) {
    console.error("Error processing skip cart request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { skipCart };
