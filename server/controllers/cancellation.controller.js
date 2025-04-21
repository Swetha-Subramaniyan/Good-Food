const { PrismaClient } = require("@prisma/client");
const express = require("express");
const prisma = new PrismaClient();

const cancelSubscription = async (req, res) => {
  const { subscription_id, user_subscription_id, cancellation_reason } =
    req.body;

  const { user_id, customer_id } = req.user;

  try {
    const userSubscription = await prisma.user_Subscription.findUnique({
      where: { id: user_subscription_id },
      include: {
        Subscription: {
          include: {
            DurationSubs: true,
          },
        },
      },
    });

    if (!userSubscription) {
      return res.status(404).json({ error: "User subscription not found" });
    }

    const cancellationCriteria = await prisma.Cancellation_Criteria.findFirst({
      where: {
        plan_Duration:
          userSubscription.Subscription.DurationSubs.actual_days.toString(),
      },
    });

    if (!cancellationCriteria) {
      return res
        .status(400)
        .json({
          error:
            "Cancellation criteria not found for this subscription duration",
        });
    }

    const currentTime = new Date();
    const priorTime = new Date(cancellationCriteria.prior_time);

    if (currentTime > priorTime) {
      return res
        .status(400)
        .json({ error: "Cancellation request is too late" });
    }

    const cancellation = await prisma.cancellation.create({
      data: {
        cancellation_criteria_id: cancellationCriteria.id,
        subscription_id: subscription_id,
        user_subscription_id: user_subscription_id,
        user_id: user_id,
        customer_id: customer_id,
        cancellation_date: new Date(),
        cancellation_reason: cancellation_reason,
        refund_status: "PENDING",
      },
    });

    await prisma.user_Subscription.update({
      where: { id: user_subscription_id },
      data: { status: "CANCELLED" },
    });

    const refundPercentage = parseFloat(cancellationCriteria.refund_percentage);
    if (refundPercentage > 0) {
      const totalAmount = userSubscription.Subscription.price;
      const refundAmount = (totalAmount * refundPercentage) / 100;

      await prisma.cancellation.update({
        where: { id: cancellation.id },
        data: { refund_status: "PROCESSED", refund_amount: refundAmount },
      });

      await prisma.User_Wallet.create({
        data: {
          user_id: user_id,
          refunded_amount: refundAmount.toString(),
          created_at: new Date(),
          updateAt: new Date(),
        },
      });
    }

    res.status(200).json({
      message: "Cancellation request processed successfully",
      cancellation,
    });
  } catch (error) {
    console.error("Error processing cancellation request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const checkCancellationStatus = async (req, res) => {
  const { user_subscription_id } = req.params;

  try {
    const cancellation = await prisma.Cancellation.findFirst({
      where: {
        user_subscription_id: parseInt(user_subscription_id),
      },
    });

    console.log("Sss", cancellation)

    if (!cancellation) {
      return res.status(200).json({ 
        isCancelled: false,
        cancellationPending: false 
      });
    }

    res.status(200).json({
      isCancelled: cancellation.cancellation_status,
      cancellationPending: !cancellation.cancellation_status
    });
  } catch (error) {
    console.error("Error checking cancellation status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateCancellationStatus = async (req, res) => {
  const { user_subscription_id } = req.params;
  const { cancellation_status } = req.body;

  try {
    const updatedCancellation = await prisma.Cancellation.updateMany({
      where: {
        user_subscription_id: parseInt(user_subscription_id),
      },
      data: {
        cancellation_status: cancellation_status === 'true',
      },
    });

    if (cancellation_status === 'true') {
      await prisma.User_Subscription.update({
        where: {
          id: parseInt(user_subscription_id),
        },
        data: {
          status: 'CANCELLED',
        },
      });

      await prisma.Orders.updateMany({
        where: {
          subscription_id: parseInt(user_subscription_id),
          status: 'PENDING',
        },
        data: {
          status: 'CANCELLED',
        },
      });
    }

    res.status(200).json({
      message: "Cancellation status updated successfully",
      updatedCancellation,
    });
  } catch (error) {
    console.error("Error updating cancellation status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCancelledSubscriptions = async (req, res) => {
  try {
    const cancelledSubscriptions = await prisma.User_Subscription.findMany({
      where: {
        status: "CANCELLED"
      },
      include: {
        Subscription: {
          include: {
            parentPlan1: true,
            MealSub: true,
            DurationSubs: true,
            FoodSubscription: {
              include: {
                FoodItems: true
              }
            }
          }
        },
        userSubscriptionDetails: true,
      },
      orderBy: {
        end_date: "desc"
      }
    });
    

    const subscriptionIds = cancelledSubscriptions.map(sub => sub.id);
    
    const cancellations = await prisma.Cancellation.findMany({
      where: {
        user_subscription_id: {
          in: subscriptionIds
        }
      }
    });

    const cancellationMap = {};
    cancellations.forEach(c => {
      cancellationMap[c.user_subscription_id] = c;
    });

    console.log("Sss", cancelledSubscriptions, subscriptionIds, cancellationMap)

    const formattedData = cancelledSubscriptions.map(sub => {
      const cancellation = cancellationMap[sub.id] || null;
      return {
        id: sub.id,
        user: {
          id: sub.userSubscriptionDetails.id,
          name: sub.userSubscriptionDetails.username,
          email: sub.userSubscriptionDetails.email
        },
        plan: {
          plan_details: sub,
          meal_type: sub.Subscription.MealSub.meal_type,
          duration: sub.Subscription.DurationSubs.actual_days
        },
        dates: {
          start: sub.start_date,
          end: sub.end_date
        },
        cancellation: cancellation ? {
          reason: cancellation.cancellation_reason,
          date: cancellation.cancellation_date,
          status: cancellation.cancellation_status
        } : null
      };
    });

    res.status(200).json({
      success: true,
      data: formattedData
    });

  } catch (error) {
    console.error("Error fetching cancelled subscriptions:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch cancelled subscriptions"
    });
  }
};


module.exports = { cancelSubscription, checkCancellationStatus,updateCancellationStatus, getCancelledSubscriptions };
