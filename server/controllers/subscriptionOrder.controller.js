const express = require('express')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getSubscriptionOrders = async(req,res) => {
    try {
        const getOrders = await prisma.subscription_Order.findMany()
        res.status(200).json({message : "Success",getOrders})
    } catch (error) {
        console.log(error)
        res.status(404).json({error : "No Orders fetched"})
    }
}

const createSubscriptionOrders = async(req,res) => {
    try {
        const {user_id,customer_id}=req.user;
       const newOrder = await prisma.subscription_Order.create({
        data : {
            user_id,
            customer_id,
            order_item_id,
            user_subscription_id,
            created_at : new Date(),
            updatedAt : new Date()
        }
       }) 
       res.status(200).json({message : "Success",newOrder})
    } catch (error) {
        console.log(error)
        res.status(404).json({error : "No Orders created"})
    }
}

module.exports = {getSubscriptionOrders,createSubscriptionOrders}