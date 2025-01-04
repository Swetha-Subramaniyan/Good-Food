const express = require('express')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();


const getUserSubscription = async(req,res) => {
  try {
    const getSubscriptions = await prisma.user_Subscription.findMany({
       select : {
        user_id,
        subscription_id,
        start_date,
        end_date
       }
    })
    res.status(200).json({message : "User Subscriped", getSubscriptions})
  } catch (error) {
    console.log(error)
    res.status(404).json({error : "No user subscriped"})
  }
}

const createUserSubscription = async (req, res) => {
  try {
    const { subscription_id } = req.body;
    const { user_id } = req.user;

    const subscriptionDuration = await prisma.duration_qty.findUnique({
      where: { id : subscription_id },
      select: { days: true },
    });

   

    const days = subscriptionDuration.days;

    const start_date = new Date(); 
    const end_date = new Date(start_date);
    end_date.setDate(start_date.getDate() + days);

    

    console.log("Start Date:", start_date.toISOString().split("T")[0]); 
    console.log("End Date:", end_date.toISOString().split("T")[0]);

    const createSubscription = await prisma.user_Subscription.create({
      data: {
        subscription_id,
        start_date,
        end_date, 
        status: "Pending",
        user_id,
        created_at: new Date(),
        updatedAt: new Date(),
      },
    });

    res.status(200).json({ message: "Subscription Created", createSubscription });
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(500).json({ error: error.message || "Subscription creation failed" });
  }
};

  
  
  
  
  
  
  

module.exports = {getUserSubscription,createUserSubscription}