const express = require('express')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getPricingDetails = async(req,res) => {
    try {
        const getPricing = await prisma.pricing_Details.findMany()
        res.status(200).json({message : "Price Details",getPricing})
    } catch (error) {
       console.log(error)
       res.status(404).json({error : "No Price details found"}) 
    }
}

const createPrice = async(req,res) => {
    try {
        const {price} = req.body;
        const newPrice  = await prisma.pricing_Details.create({
            data : {
                price,
                created_at : new Date(),
                updatedAt : new Date()
            }
        })
        res.status(200).json({message : "Price created",newPrice})
    } catch (error) {
        console.log(error)
        res.status(404).json({error : "Price not created"})
    }
}

module.exports = {getPricingDetails,createPrice}