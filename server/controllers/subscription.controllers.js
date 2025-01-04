const express = require('express')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getAllSubscription = async (req,res) => {
    try {
        const getSubs = await prisma.subscription.findMany()
        res.status(200).json({message : "All Subscription fetched",getSubs})
    } catch (error) {
       console.log(error)
       res.status(404).json({error : "No Subscriptions found"}) 
    }
}

const getSubscription = async (req,res) => {
try {
    const getSUB = await prisma.subscription.findMany({
        include : {
           parentPlan1 : true,
           SubscriptionPayments : true
        }
    })
    res.status(200).json({message : "Subscription found",getSUB})
} catch (error) {
    console.log(error)
    res.status(404).json({error : "Subscriptions not found "})
}
}


const createSubscription = async (req,res) => {
 try {
    const {parent_plan_id,plan_description,tier_id,duration_qty_id,meal_type_id,price_id}=req.body
    const createSubs = await prisma.subscription.create({
        data : {
           
            parent_plan_id,
            plan_description,
            tier_id,
            duration_qty_id,
            meal_type_id,
            price_id,
            created_at : new Date(),
            updatedAt : new Date()
        }
    })
    res.status(200).json({message:"Successfull",createSubs})
 } catch (error) {
    console.log(error)
    res.status(404).json({error : "No Subscription"})
 }
}

module.exports={getAllSubscription,getSubscription,createSubscription}