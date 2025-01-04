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



const createSubscription = async (req,res) => {
 try {
    const {plan_name,parent_plan_id,plan_description,breakfast_qty,lunch_qty,dinner_qty,plan_duration,price}=req.body
    const createSubs = await prisma.subscription.create({
        data : {
            plan_name,
            parent_plan_id,
            plan_description,
            breakfast_qty,
            lunch_qty,
            dinner_qty,
            plan_duration,
            price,
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

module.exports={getAllSubscription,createSubscription}