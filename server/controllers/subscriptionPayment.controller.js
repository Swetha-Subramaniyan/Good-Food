const express = require('express')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getSubscriptionPayment = async(req,res) => {
    try {
        const getPayment = await prisma.subscription_Payment.findMany({
            include : {
                SubscriptionPaymentUsers : true,
                SubscriptionPayment : true
            }
        })
        res.status(200).json({message : "Payment fetched",getPayment})
    } catch (error) {
        console.log(error)
        res.status(404).json({error : "No payment processed"})
    }
}

const createSubscriptionPayment = async (req, res) => {
    try {
      const { payment_method, subscription_id, payment_status } = req.body;
      const {user_id} = req.user;
  
      const payment = await prisma.subscription_Payment.create({
        data: {
          payment_method,
          subscription_id,
          user_id,
          payment_status,
        },
      });
  
      res.status(201).json( {message : "payment success", payment});
    } catch (error) {
      console.error('Error creating subscription payment:', error);
      res.status(500).json({ error: 'Failed to create subscription payment' });
    }
  };
  
 

module.exports = {getSubscriptionPayment,createSubscriptionPayment}