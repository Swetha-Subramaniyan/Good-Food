const express = require('express')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getSubscriptionPricing = async(req,res) => {
    try {
        const getSubscription = await prisma.subscription_Pricing.findMany()
        res.status(200).json({message : "Subcription Price fetched" , getSubscription})
    } catch (error) {
        console.log(error)
        res.status(404).json({error :"No price fetched "})
    }
}


const createSubscriptionPricing = async(req,res) => {
    try {
        const {subscription_id,pricing_id} = req.body;
        const newPricing = await prisma.subscription_Pricing.create({
            data : {
                subscription_id,
                pricing_id,
                created_at : new Date(),
                updatedAt : new Date()
            }
        })
        res.status(200).json({message : "Price created", newPricing})
    } catch (error) {
       console.log(error)
       res.status(404).json({error : "No pricing created"}) 
    }
}

module.exports= {getSubscriptionPricing,createSubscriptionPricing}