const { PrismaClient } = require("@prisma/client");
const express = require("express");
const prisma = new PrismaClient();

const cancelSubscription = async (req, res) => {
    const { subscription_id, user_subscription_id, cancellation_reason } = req.body;

    const {user_id, customer_id} = req.user;
  
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
          plan_Duration: userSubscription.Subscription.DurationSubs.actual_days.toString(), 
        },
      });
  
      if (!cancellationCriteria) {
        return res.status(400).json({ error: "Cancellation criteria not found for this subscription duration" });
      }
  
      const currentTime = new Date();
      const priorTime = new Date(cancellationCriteria.prior_time); 
  
      if (currentTime > priorTime) {
        return res.status(400).json({ error: "Cancellation request is too late" });
      }
  
      const cancellation = await prisma.cancellation.create({
        data: {
          cancellation_criteria_id: cancellationCriteria.id,
          subscription_id: subscription_id,
          user_subscription_id: user_subscription_id,
          user_id: user_id,
          customer_id:customer_id,
          cancellation_date: new Date(),
          cancellation_reason: cancellation_reason,
          refund_status: "PENDING", 
          cancellation_status: "REQUESTED", 
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

module.exports = { cancelSubscription };
