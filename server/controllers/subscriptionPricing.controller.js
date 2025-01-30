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

const getPaymentProcess = async(req,res) => {
    try {
        const {id} = req.body;
        const getAmount = await prisma.subscription.findMany({
            where : {id},
           select : { PricingDetails : {select : {price : true }}}})
        res.status(200).json({message : "success",getAmount})
    } catch (error) {
        console.log(error)
        res.status(404).json({error : "Failureeeeeeeeeee"})
    }
}

22
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

module.exports= {getSubscriptionPricing,getPaymentProcess,createSubscriptionPricing}